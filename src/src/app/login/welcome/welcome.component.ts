
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import * as $ from 'jquery';
import * as shajs from 'sha.js';
import { isNullOrUndefined } from 'util';
import { HomeService } from 'src/app/home/home.service';
// import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['../login.component.css', './welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  submitted = false;
  configObj: any;
  // error = false;
  errorMesage: string;
  // errorCode: any;
  loading = true;

  constructor(
    // public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public homeService: HomeService) {
  }

  ngOnInit() {
    this.configObj = this.getBannerMessage();
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.loadJquery();
    // this.errorMesage = this.commonService.sessionExpiredMsg;
  }

  ngOnDestroy() {
    // this.commonService.sessionExpiredMsg = '';
  }

  getBannerMessage() {
    this.loginService.getBannerMessage().subscribe(data => {
      this.configObj = data;
    });
    // this.configObj = {
    //   'bannerMessageFirst': "Sign-up & send walls for free!",
    //   'bannerMessageSecond': "Looking for professional support? Ask us about Enterprise services.",
    //   'learnMoreLink': "https://andishere.com/katieinsights/",
    //   'loginScreenMessage': "Welcome",
    //   'messageScrollInterval': 5,
    //   'scheduledMaintenanceMessage': "Version 1.3 coming soon!"
    // }
  }

  get f() { return this.loginForm.controls; }

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

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.f.username.value, this.f.password.value).subscribe((data: any) => {
      if (data) {
        const item = data;
        // console.log('admin login res', data);

        const passwordInfo = {
          isPwdExpiryReminderNeedToShow: item['isPwdExpiryReminderNeedToShow'],
          SuperAdmin: item['isClientSuperAdmin'],
          expiryDate: item['passwordExpiryDate']
        };
        // this.loginService.setPasswordExpiryInfo(passwordInfo);
        localStorage.setItem('x-auth-token', data['authorisationToken']);
        // localStorage.setItem('accountId', item['accountId']);
        // localStorage.setItem('accountId-token', item['accountId']); // ask swapnil
        // localStorage.setItem('helpURL', item['supportUrl']);
        localStorage.setItem('userId', item['userId']);
        localStorage.setItem('roleId', item['roleId']);
        localStorage.setItem('roleName', item['roleName']);

        localStorage.setItem('loggedInUserMail', this.f.username.value);
        localStorage.setItem('loggedUser', item['firstName'] + ' ' + item['lastName']);
        localStorage.setItem('userNameInitials', item['userNameInitials']);
        // localStorage.setItem('superAdmin', item['isClientSuperAdmin']);
        localStorage.setItem('sessionTimeOutInterval', item['sessionTimeOutInterval']);
        localStorage.setItem('previewMinutes', item['previewMinutes']);

        // localStorage.setItem('planUserHold', item['accountPlanName']);
        // localStorage.setItem('planTypeHold', item['accountPlanPriceType']);

        // if (item['isClientSuperAdmin'] === true) {
        //   this.router.navigate(['/account-listing']);
        // } else {
        // this.router.navigate(['/home']);

        // get client list  and store in home service
        // this.homeService.allClientList = item['client'];

        this.router.navigate(['/wall-listing']);
        // }
      }
    },
      val => {
        // this.error = true;
        // this.errorCode = val.error.errorCode;

        // if (val.error.errorCode === 500) {
        this.errorMesage = val.error.errorMessage;
        // }
        // else {
        //   this.errorMesage = 'Incorrect email or password';
        // }
        // else {
        //   this.errorMesage = val.error.errorMessage;
        // }

        // if (this.errorCode === 5009) {
        //   setTimeout(() => {
        //     this.messageService.setEmail(this.f.username.value);
        //     this.router.navigate(['/confirm-your-email']);
        //   }, 2000);
        // } else if (this.errorCode === 5008) {
        //   this.errorMesage = 'Incorrect email or password';
        // }

      });
  }

  signUp() {
    this.router.navigate(['/signUp']);
  }
}
