import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from '../../environments/environment';
// import { WallCommonService } from '../wall/wall-common.service';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  invokeEvent: Subject<any> = new Subject();
  coreUrl: any;
  public wallLabel: string;
  // input = new BehaviorSubject('test');
  sessionExpiredMsg: string;
  logoutServiceURL = '';

  constructor(private httpClient: HttpClient,
    //  private wallservice: WallCommonService
      ) {
    // this.coreUrl = environment.service_url_core;
    // this.logoutServiceURL = environment.api_Auth_Url + '/';
  }

  refreshHeaderSection(val) {
    this.invokeEvent.next(val);
  }


  // public updateWallLabel(sId: any, label: string): Observable<any> {
  //   const data = {
  //     "wallId": sId,
  //     "wallName": label
  //   };
  //   return this.httpClient.post(this.coreUrl + '/update_wall_name', data).
  //     pipe(map(response => response));
  // }

  async setSessionExpiredMsg(msg: string) {
    this.sessionExpiredMsg = msg;
  }


  public logoutService(value): Observable<any> {
    // this.wallservice.commonToggle = false;
    return this.httpClient.get(this.logoutServiceURL + 'logout' + '?logoutType=' + value);
  }

}
