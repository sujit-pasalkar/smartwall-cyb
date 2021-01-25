import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subscription, Subject, pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // apiUrl = '';
  ipAddress;
  authToken: any;

  constructor(private http: HttpClient) {
    // this.apiUrl = environment.webUrl;
  }

  getBannerMessage() {
    return this.http.get(environment.webUrl + 'v1/design/auth/banner_message').pipe(
      map(res => {
        return res;
      })
    );
  }

  getIpAddress() {
    return this.http.get('https://api.ipify.org/?format=json').pipe(map(res => res));
  }

  login(username: string, password: string) {
    const formData = {
      'username': username,
      'password': password,
      'ipAddress': this.ipAddress
      // 'isAdmin': 'Y'
    };
    return this.http.post(environment.webUrl + 'v1/design/auth/authenticate', formData).pipe(map(user => user));
  }

  // login(){

  //   this.http.post<any>(this.constantService.WEBSERVICE_URL+'v1/auth/authenticate',this.user)
  //   .subscribe((res: any) => {
  //     localStorage.setItem('access_token', res.jwttoken);
  //     localStorage.setItem('userId',res.userId);
  //     localStorage.setItem('browserRefreshTime',res.browserRefreshTime);
  //    // window.location.replace('/dashboard');
  //     this.router.navigate(['./dashboard']);
  //   },(error)=>{
  //     this.isAuthorisedUser = true;
  //     setTimeout(()=>{
  //       this.isAuthorisedUser = false;
  //     },5000);

  //   })
  // }

  public forgotPasswordSendEmail = (emailBody): any => {
    // environment.webUrl + 'v1/auth/authenticate'
    return this.http.post(`${environment.webUrl}v1/design/auth/forgot-password`, emailBody) // not tsted
      .pipe(map(response => response));
  }

   public resetPassword = (resetObj): any => {
    return this.http.post(`${environment.webUrl}v1/design/auth/reset-password`, resetObj)
      .map(response => response);
  }

  changePasswordService(userID, oldPassword, newPassword, matchedPassword): Observable<any> {
    const data = {
      userId: userID,
      oldPassword: oldPassword,
      password: newPassword,
      confirmPassword: matchedPassword
    };
    return this.http.post<any>(`${environment.webUrl}v1/design/auth/reset-user-password`, data); // add core.. // not tsted
  }

  resendEmailConfirmation(email): Observable<any> {
    const data = {
      primaryContactEmail: email
    };
    return this.http.post<any[]>(environment.webUrl + 'resendemail/verification', data); // add core..
  }

  setAuthToken(val) {
    this.authToken = val;
  }
  getAuthToken() {
    return this.authToken;
  }

  getBrandingLogo(clientId) {
    let url = '';
    url = environment.webUrl + 'get_logo/' + clientId;
    return this.http.get(url)
      .map(res => res);
  }
  getTermsConditions() {
    return this.http.get(environment.webUrl + '/terms_coditions')
      .map(res => {
        return res;
      });
  }

}
