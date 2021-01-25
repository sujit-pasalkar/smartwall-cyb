import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { DomSanitizer } from '@angular/platform-browser'
import { LoginService } from '../login.service';
import * as $ from 'jquery';
import { Location } from '@angular/common';

@Component({
  selector: 'sa-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../login.component.css', './change-password.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};
  resetPasswordForm: any;
  responseMessageShow: any;
  responseMessage: any;
  token: any;
  txtMsg = '';
  html: any;
  newconfirmPassword: any;
  newPpassword: any;
  oldPassword: any;
  confirmMatch: boolean;
  currentPassword: any;
  emptyConfirmPassword: string;
  timeInterval: number;
  configObj: any;
  currentYear: any;
  userId: string;
  errorCodePassword: any;
  errorMessageDuplicate: any;
  passwordNotValid = false;
  changeSuccessful: boolean;


  constructor(private formBuilder: FormBuilder,
    private _location: Location,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    this.html = sanitizer.bypassSecurityTrustHtml(`
    <h5 class="text-color" >Password</h5>
    <ul>
    <li id="capital" class="invalid">At least 1 uppercase character (A-Z)</li>
    <li id="letter" class="invalid">At least 1 lowercase character (a-z)</li>
    <li id= "number" class="invalid">At least 1 digit (0-9)</li>
    <li id="specialCharacter" class="invalid">At least 1 special character</li>
    <li id="length" class="invalid">At least 8 characters</li>
    <li id="identical" class="invalid">Not more than 2 identical characters in</li>
    </ul>
  `);
    this.userId = localStorage.getItem('userId');
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, this.passwordValidator.bind(this)]],
      password: ['', [Validators.required, this.passwordValidator.bind(this)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.confirmPasswordValidator.bind(this) });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    });
    this.loadJquery();
  }

  tooltipValidations(event) {
    let tooltipContainer = document.getElementById('tooltipContainer')

    // let letter = document.getElementsByClassName("letter");
    // let capital = document.getElementsByClassName("capital");
    let capital = document.getElementById("capital");
    let letter = document.getElementById("letter");
    let number = document.getElementById("number");
    let length = document.getElementById("length");
    let specialCharacter = document.getElementById("specialCharacter");
    let identical = document.getElementById("identical");

    // const upperCaseLetters = /[A-Z]/g;
    // if (event.target.value.match(upperCaseLetters)) {
    //   capital[0].classList.remove("invalid");
    //   capital[0].classList.add("valid");
    // } else {
    //   capital[0].classList.remove("valid");
    //   capital[0].classList.add("invalid");
    // }

    const upperCaseLetters = /[A-Z]/g;
    if (event.target.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    const lowerCaseLetters = /[a-z]/g;
    if (event.target.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    const numberMandatory = /[0-9]/g;
    if (event.target.value.match(numberMandatory)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    if (event.target.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }

    const specialCharacterMandatory = /[^\w\s]/g;
    if (event.target.value.match(specialCharacterMandatory)) {
      specialCharacter.classList.remove("invalid");
      specialCharacter.classList.add("valid");
    } else {
      specialCharacter.classList.remove("valid");
      specialCharacter.classList.add("invalid");
    }

    const twoIdentical = /^(([a-zA-Z0-9\w\S])\2?(?!\2))+$/g;
    if (event.target.value.match(twoIdentical)) {
      identical.classList.remove("invalid");
      identical.classList.add("valid");
    } else {
      identical.classList.remove("valid");
      identical.classList.add("invalid");
    }

    const dontAllow = /[\"\:\s]/;
    if (event.target.value.match(dontAllow)) {
      this.passwordNotValid = true;
    }
    else {
      this.passwordNotValid = false;
    }
  }

  confirmPasswordValidator(control) {
    if (control && control !== null && control !== undefined &&
      this.resetPasswordForm && this.resetPasswordForm !== null && this.resetPasswordForm !== undefined) {
      const pass = this.resetPasswordForm.controls['password'].value;
      const confirmPass = this.resetPasswordForm.controls['confirmPassword'].value;
      // const confirmPass = control.value;
      return confirmPass === pass ? null : { notSame: true };
    }
  }

  confirmPwd = () => {
    this.emptyConfirmPassword = this.resetPasswordForm.value.confirmPassword;
    if (this.resetPasswordForm.value.password === this.resetPasswordForm.value.confirmPassword) {
      this.confirmMatch = false;
    } else {
      this.confirmMatch = true;
    }
  }

  passwordValidator(c: FormControl) {
    let cValue;
    if (c && c != null && c.value && c.value != null) {
      const re = new RegExp('^(?!.*([A-Za-z0-9#?!@$%^&*-\\s\\._])\\1{2})(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\\s\\._]).{8,}$');
      cValue = re.test(c.value);
    } else {
      cValue = true;
    }
    return cValue === true ? null : { passeordCorrect: true };
  }

  loadJquery() {
    $('.toggle-passwordReset').click(function () {
      // $(this).toggleClass('fa-eye fa-eye-slash');
      const input = $($(this).attr('toggle'));
      if (input.attr('type') === 'password') {
        input.attr('type', 'text');
        $(this).css({ "opacity": "1" });
      } else {
        input.attr('type', 'password');
        $(this).css({ "opacity": "0.7" });
      }
    });
  }

  changePasswordSubmit(form) {
    if (form && form !== null && form !== undefined) {
      this.loginService.changePasswordService(this.userId, this.oldPassword, this.newPpassword, this.newconfirmPassword).subscribe((data) => {
        this.responseMessageShow = true;
        this.responseMessage = data.msg;
        this.changeSuccessful = true;
        setTimeout(() => {
          this._location.back();
        }, 2000);

      }, error => {
        this.responseMessageShow = true;
        this.responseMessage = error.error.errorMessage;
        this.changeSuccessful = false;

      });
    }

  }
}

