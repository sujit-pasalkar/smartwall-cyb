import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonServiceService } from '../common-service.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordDialogComponent implements OnInit {


  model: any = {};
  resetPasswordForm: any;
  responseMessageShow = false;
  responseMessage: any;
  token: any;
  txtMsg = '';
  html: any;
  newconfirmPassword: any;
  newPassword: any;
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

  error: boolean= false;
  errorMesage: any;
  errorCode: any;
  invalidPassword: any;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder,
    private commonService: CommonServiceService,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private sanitizer: DomSanitizer,
    public homeService: HomeService) {
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

    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, this.passwordValidator.bind(this)]],
      password: ['', [Validators.required, this.passwordValidator.bind(this)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.confirmPasswordValidator.bind(this) });
  }

  ngOnInit(): void {
    this.loadJquery();
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
      console.log('calling api');

      this.homeService.changePassword(this.oldPassword, this.newPassword, this.newconfirmPassword).subscribe((data) => {
        console.log('changepass',data);

        this.responseMessageShow = true;
        this.responseMessage = data.responseMessage;
        this.changeSuccessful = true;
        this.error = false;

        setTimeout(() => {
        this.dialogRef.close(true);
        }, 2000);

      }, error => {
        console.log('changepass err',error);
        this.error = true;
        this.responseMessageShow = false;
        // this.responseMessage = error.error.errorMessage;
        this.changeSuccessful = false;

        //
        this.errorMesage = error.error.errorMessage;
        this.errorCode = error.error.errorCode;

        // if (this.errorCode === 5006) {
        this.invalidPassword = this.errorMesage;
        // }

      });
    }

  }

}
