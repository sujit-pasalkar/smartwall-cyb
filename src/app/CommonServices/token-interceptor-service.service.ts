import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable()
export class TokenInterceptorServiceService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (req.url.includes('core/v1') && req.url.includes('user-account')) {
    //   return next.handle(req);
    // }
    // if (req.url.includes('core/v1') && req.url.includes('terms_coditions')) {
    //   return next.handle(req);
    // }
    // if (req.url.includes('core/v1') && req.url.includes('unsubscribe')) {
    //   return next.handle(req);
    // }
    // if (req.url.includes('core/v1') && req.url.includes('reset-user-password')) {
    //   return next.handle(req);
    // } else
    if (req.url.includes('v1/design/core') && !req.url.includes('banner_message')) {
      // && !req.url.includes('terms_coditions') && !req.url.includes('reset-user-password')
      const token = localStorage.getItem('x-auth-token');
      const cloneReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });

      return next.handle(cloneReq);
    } else {
      return next.handle(req);
    }
  }
}
