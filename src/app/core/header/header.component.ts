import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { LoginService } from 'src/app/login/login.service';
import * as $ from 'jquery';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SessionTimeoutDialogComponent } from '../session-timeout-dialog/session-timeout-dialog.component';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { HomeService } from 'src/app/home/home.service';
import { SelectClientComponent } from 'src/app/home/wall-listing/pop-up/select-client/select-client.component';

@Component({
  selector: 'wall-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../app.component.css', './header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public labelText;
  shortName: string;
  isClientSuperAdmin: any;
  loginResponse: any;
  receivedChildMessage: string;
  listingFlag: Boolean;
  settingIcon: Boolean;
  userActivity;
  sessionTimer: number;
  isTimeoutDialogOpen = false;
  userPlan: string;
  accountId: string;
  dropDown: boolean = false;
  userPlanId: any;
  showWall = false;
  // stripeSubscriptionStatus: any;

  constructor(private router: Router,
    public homeService: HomeService,
    private commonService: CommonServiceService,
    private loginService: LoginService,
    private dialog: MatDialog,) {
    // window.addEventListener('hashchange', this.hashHandler, false);
  }

  ngOnInit() {
    this.labelText = localStorage.getItem('loggedUser');
    this.shortName = localStorage.getItem('userNameInitials');
    this.isClientSuperAdmin = localStorage.getItem('superAdmin');
    this.accountId = localStorage.getItem('accountId');
    // window.location.pathname.includes('/account-listing') ? this.listingFlag = false
    //   : this.listingFlag = true;
    // session timeout start
    this.sessionTimer = +localStorage.getItem('sessionTimeOutInterval');
    this.setTimeout();
  }

  ngOnDestroy() {
    clearTimeout(this.userActivity);
  }

  navigate(){
    this.router.navigate(['/wall-listing']);
  }

  async logout(type: string) {
    localStorage.clear();
    this.dialog.closeAll();
    if (type === 'auto') {
      this.commonService.logoutService('auto').subscribe(data => {
      });
      // subject to trigger session expired msg
      this.commonService.setSessionExpiredMsg('Your session has expired. Please log in again.');
    } else {
      this.commonService.logoutService('manual').subscribe(data => {
        console.log('logout manual-', data);

      });
    }
    this.router.navigate(['/login']);
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '31.563rem', // '35rem',
      height: '',
      data: {
        data: ''
      },
      // disableClose: true
    });

    // after selectClient dilaog close
    dialogRef.afterClosed().subscribe(
      clientId => {
      }
    );
  }

  changeAccount() {
    const dialogRef = this.dialog.open(SelectClientComponent, {
      width: '30rem',
      data: {
        data: this.homeService.allAccountList
      },
    });

    dialogRef.afterClosed().subscribe(
      accountId => {
        console.log('after close select Account-', accountId);

        // if client selected get that clent data from api
        if (accountId !== '' && accountId !== undefined) {
          // set selected client name to clientName
          const selectedClientArray: any[] = this.homeService.allAccountList.filter(el => el.value === accountId);
          // get walltable data from clientId
          // call showWallTable subject event
          this.homeService.sendChangeAccountData(selectedClientArray);

          // if navigation url is not wall-listing then navigate to wall list
          console.log('this.router.url', this.router.url);

          this.router.navigate(['/wall-listing']);
        }
      }
    );
  }

  openHelpWebsite() {
    if (localStorage.getItem('helpURL') === null) {
      window.open("https://andishere.com/");
    } else {
      window.open(localStorage.getItem('helpURL'));
    }
  }


  loginDropdown() {
    // $('.dropdown-menu').slideDown();
    this.dropDown = !this.dropDown;
  }


  @HostListener('window:keyup', ['$event'])
  @HostListener('window:click', ['$event'])
  @HostListener('window:mousemove', ['$event'])

  resetTimer(event) {
    clearTimeout(this.userActivity);
    if (!this.isTimeoutDialogOpen) {
      this.setTimeout();
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    $(document).mouseup(function (e) {
      let logoutDropdown = $('.dropdown-menu');
      if (!logoutDropdown.is(e.target) && logoutDropdown.has(e.target).length === 0) {
        logoutDropdown.slideUp();
      }
    });
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!document.getElementById("dropDown").contains(event.target) && this.dropDown) {
      this.dropDown = false;
    }
  }

  showWallTab() {
    this.showWall = true;
  }

  setTimeout() {
    this.userActivity = setTimeout(() => {
      if (!this.isTimeoutDialogOpen && this.sessionTimer !== null) {
        // this.openSessionDialog();
      }
    }, (this.sessionTimer * 100000) * 6); // 1 hr = 60 Minutes = 3,600,000 Milliseconds
  }

  openSessionDialog() {
    this.isTimeoutDialogOpen = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'my-dialog';
    const dialogRef = this.dialog.open(SessionTimeoutDialogComponent, dialogConfig);
    clearTimeout(this.userActivity);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== true) {
        this.logout(result);
      }

      // continue
      this.isTimeoutDialogOpen = false;
      this.setTimeout();
    });
  }

  // wallList(){
  //   this.router.navigate(['/wall-listing']);
  // }

  /* fullName() {
    this.commonService.changeLabel(this.labelText);
  } */

  /* LabelChange() {
    this.commonService.changeLabel(this.labelText);
  }
   */

  checkSaveToggle(buttonName: string) {
    // if (this.wallservice.commonToggle) {
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.disableClose = false;
    //   dialogConfig.autoFocus = false;
    //   dialogConfig.width = '36.0625rem';
    //   const dialogRef = this.dialog.open(SaveQuestionDialogComponent, dialogConfig);
    //   dialogRef.afterClosed().subscribe(async result => {
    //     if (result === undefined) {
    //     } else if (result) {
    //       // stay
    //       return false;
    //     } else {
    //       // this.wallservice.commonToggle = false;
    // if (buttonName === 'openHelpWebsite') {
    //         this.openHelpWebsite();
    //       } else {
    //         this.logout('manually');
    //       }
    //     }
    //   });
    // } else {
    // if (buttonName === 'openHelpWebsite') {
    //     this.openHelpWebsite();
    //   } else {
    //     this.logout('manually');
    //   }
    // }

    if (buttonName === 'logout') {
      this.logout('manually');
    } else if (buttonName === 'changePassword') {
      // if (this.homeService.allClientList.length > 1) {
      //   const dialogRef = this.dialog.open(SelectClientComponent, {
      //     width: '30rem',
      //     data: {
      //       data: this.homeService.allClientList
      //     },
      //     disableClose: true
      //   });
      // }
      this.changePassword();
    } else if (buttonName === 'changeAccount') {
      this.changeAccount();
    }
  }
}
