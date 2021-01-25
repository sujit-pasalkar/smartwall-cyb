import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { DomSanitizer } from '@angular/platform-browser'
import { LoginService } from '../login.service';
import * as $ from 'jquery';

@Component({
  selector: 'sa-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login.component.css', './reset-password.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};
  resetPasswordForm: FormGroup;
  token: any;
  txtMsg = '';
  html: any;
  confirmMatch: boolean;
  emptyConfirmPassword: string;
  timeInterval: number;
  responseMessageShow = false;
  responseMessage: any;

  configObj: any;
  currentYear: any;
  passwordNotValid = false;
  errorMesage: any;
  error: boolean;
  errorCode: any;
  invalidPassword: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    this.html = sanitizer.bypassSecurityTrustHtml(`
    <h5 class="text-color" >Password</h5>
    <ul>
    <li class="invalid">Password must be at least 8 characters and have 1 uppercase, 1 special character and 1 numeric value.</li>
    </ul>
  `);

    // <li id="capital" class="invalid">At least 1 uppercase character (A-Z)</li>
    //   <li id="letter" class="invalid">At least 1 lowercase character (a-z)</li>
    //   <li id= "number" class="invalid">At least 1 digit (0-9)</li>
    //   <li id="specialCharacter" class="invalid">At least 1 special character</li>
    //   <li id="length" class="invalid">At least 8 characters</li>
    //   <li id="identical" class="invalid">Not more than 2 identical characters in</li>

    this.resetPasswordForm = this.formBuilder.group({
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
    const tooltipContainer = document.getElementById('tooltipContainer')
    const capital = document.getElementById("capital");
    const letter = document.getElementById("letter");
    const number = document.getElementById("number");
    const length = document.getElementById("length");
    const specialCharacter = document.getElementById("specialCharacter");
    const identical = document.getElementById("identical");

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
    } else {
      this.passwordNotValid = false;

    }

  }

  confirmPasswordValidator(control) {
    if (control && control !== null && control !== undefined &&
      this.resetPasswordForm && this.resetPasswordForm !== null && this.resetPasswordForm !== undefined) {
      const pass = this.resetPasswordForm.controls['password'].value;
      const confirmPass = this.resetPasswordForm.controls['confirmPassword'].value;
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
      const re = new RegExp("^(?!.*([A-Za-z0-9#?!@$%^&*-\\s\\._])\\1{2})(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?\\[\\]/!@$`~{}+=,|';%^()&*-\\s\\._]).{8,}$");
      cValue = re.test(c.value);
    } else {
      cValue = true;
    }
    return cValue === true ? null : { passeordCorrect: true };
  }

  loadJquery() {
    $('.toggle-password').click(function () {
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

  resetPasswordSubmit(form) {
    console.log(form, this.token);

    if (form && form !== null && form !== undefined && this.token
      && this.token !== null && this.token !== undefined) {
      const objReset = {
        password: form.value.password,
        confirmPassword: form.value.confirmPassword,
        token: this.token
      };

      this.loginService.resetPassword(objReset).subscribe((data) => {
        if (data.responseCode === 200) {
          this.error = false;
          this.responseMessageShow = true;
          this.responseMessage = data.responseMessage;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 10000);
        }
      }, error => {
        this.error = true;
        this.errorMesage = error.error.errorMessage;
        this.errorCode = error.error.errorCode;

        // if (this.errorCode === 5006) {
        this.invalidPassword = this.errorMesage;
        this.responseMessageShow = false;
        // }
        this.responseMessage = error.error.errorMessage;
      });
    }
  }
}

