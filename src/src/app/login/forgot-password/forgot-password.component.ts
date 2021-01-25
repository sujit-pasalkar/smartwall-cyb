import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { LoginService } from '../login.service';

@Component({
  selector: 'sa-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', '../login.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  model: any = {};
  isEmailEmpty: boolean;
  currentYear: number;
  isExpired: boolean;
  loading: boolean;
  responseMessage: any;
  responseMessageShow = false;
  emailNotFoundError: any;
  emailNotFoundFlag;
  error: boolean;
  errorMesage: any;
  // errorCode: any;

  constructor(private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
    if (this.router.url === '/forgot-password-url-expired') {
      this.isExpired = true;
    } else {
      this.isExpired = false;
    }
  }

  forgotPasswordSubmit(form) {
    if (this.model && !isNullOrUndefined(this.model) && !isNullOrUndefined(this.model.email) && this.model.email !== '') {
      this.loginService.forgotPasswordSendEmail(this.model).subscribe(response => {
        if (response.responseCode === 200) {
          this.loading = false;
          this.isExpired = false;
          this.responseMessageShow = true;
          this.responseMessage = response.responseMessage; // success msg
          this.error = false;
        }

      }, error => {
        this.error = true;
        this.errorMesage = error.error.errorMessage;
        // this.errorCode = error.error.errorCode;

        // if (this.errorCode === 401) {
          // this.emailNotFoundError = this.errorMesage;
          this.responseMessageShow = false;
        // }

        this.loading = false;
        this.isExpired = false;
        this.responseMessage = error.error.errorMessage;
      });
    } else {
      return this.isEmailEmpty = true;
    }
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

}
