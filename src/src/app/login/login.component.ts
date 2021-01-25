import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../login/login.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'sa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  txtMsg = '';
  currentYear: any;
  timeInterval: number;
  private timer;
  configObj: any;

  constructor(private loginService: LoginService) {
    this.currentYear = new Date().getFullYear();
    this.timeInterval = 0;
   }

  ngOnInit() {
    this.getBannerMessage();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getBannerMessage() {
    this.loginService.getIpAddress().subscribe((res: any) => {
      this.loginService.ipAddress = res.ip;
      localStorage.setItem('clientIp', res.ip);
    });

    this.loginService.getBannerMessage().subscribe(data => {
      this.configObj = data;
      this.timeInterval = (this.configObj.messageScrollInterval * 1000);
      this.loadBannerMsg();
    });

    // replace with service api
    // this.configObj = {
    //   'bannerMessageFirst': "Sign-up & send walls for free!",
    //   'bannerMessageSecond': "Looking for professional support? Ask us about Enterprise services.",
    //   'learnMoreLink': "https://andishere.com/katieinsights/",
    //   'loginScreenMessage': "Welcome",
    //   'messageScrollInterval': 5,
    //   'scheduledMaintenanceMessage': "Version 1.3 coming soon!"
    // }
    // this.timeInterval = (this.configObj.messageScrollInterval * 1000);
    // this.loadBannerMsg();
  }

  loadBannerMsg() {
    this.changeTextMsg('LeftBtn');
    let cnt = 1;
    this.timer = setInterval(() => {
        if (cnt === 1) {
            cnt = 2;
            this.changeTextMsg('RightBtn');
        } else if (cnt === 2) {
            cnt = 1;
            this.changeTextMsg('LeftBtn');
        }
    }, this.timeInterval);
}

changeTextMsg(id) {
  if (!isNullOrUndefined(document.getElementById('LeftBtn'))) {
      document.getElementById('LeftBtn').style.backgroundColor = 'gray';
      document.getElementById('RightBtn').style.backgroundColor = 'gray';
      if (id === 'LeftBtn') {
          document.getElementById(id).style.backgroundColor = '#ffffff';
          return this.txtMsg = !(isNullOrUndefined(this.configObj.bannerMessageFirst))
              ? this.configObj.bannerMessageFirst : '';
      } else if (id === 'RightBtn') {
          document.getElementById(id).style.backgroundColor = '#ffffff';
          return this.txtMsg = !(isNullOrUndefined(this.configObj.bannerMessageSecond))
              ? this.configObj.bannerMessageSecond : '';
      }
  }
}


}
