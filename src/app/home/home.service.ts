import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  selectedAccount;
  selectedAccountName: string;
  allAccountList = [];
  changeAccountSubject = new Subject<any>();
  layoutTypesObject: any[];
  bgImagesList: any[] = [];
  contentTypeIds: any[];

  editScreenDetails: any;
  originalScreenDetails: any;

  existingImages: any[] = [];
  existingVideos: any[] = [];
  existingWidgets: any[] = [];
  existingTagBoxUrl: any[] = [];
  existingBackgroundImages: any[] = [];


  noExistingData: any[] = [{
    'src': '../../assets/images/no-img-to-upload.svg',
    'selectable': false,
    'fileName': '',
    'isChecked': false,
    'targetUrl':''
  },
  {
    'src': '../../assets/images/no-img-to-upload.svg',
    'selectable': false,
    'fileName': '',
    'isChecked': false,
    'targetUrl':''

  },
  {
    'src': '../../assets/images/no-img-to-upload.svg',
    'selectable': false,
    'fileName': '',
    'isChecked': false,
    'targetUrl':''

  }];

  sendChangeAccountData(item: any[]) {
    this.changeAccountSubject.next(item);
  }

  getChangeAccountData(): Observable<any> {
    return this.changeAccountSubject.asObservable();
  }

  getAccountList(): Observable<any> {
    let userId = localStorage.getItem('userId');
    return this.http.get<any>(`${environment.webUrl}v1/design/core/account?userId=${userId}`);
  }

  getSelectedAccountsWall(accountId): Observable<any> {
    return this.http.get<any>(`${environment.webUrl}v1/design/core/wall?accountId=${accountId}`);
  }

  createWall(wallName, label, accountId) {
    const formData = {
      'wallName': wallName,
      'label': label,
      'accountId': accountId
    };
    return this.http.post<any>(`${environment.webUrl}v1/design/core/wall`, formData).pipe(map(user => user));
  }

  deleteWallStatus(wallId): Observable<any> {
    return this.http.get<any>(`${environment.webUrl}v1/design/core/wall/screen/status?wallId=${wallId}`);
    //  return == > used - screen is in used(500 or !=200)
    // else msg= = 200 confirm delete
    // /v1/design/core/wall/screen/status?wallId= (GET)
  }

  deleteWall(wallId) {
    let httpParams = new HttpParams().set('wallId', wallId);
    let options = { params: httpParams };
    return this.http.delete<any>(`${environment.webUrl}v1/design/core/wall`, options);
  }

  updateWallName(data) {
    return this.http.put<any>(`${environment.webUrl}v1/design/core/wall`, data);
  }

  changePassword(current, newp, confirm) {
    const formData = {
      'currentPassword': current,
      'newPassword': newp,
      'confirmPassword': confirm
    };
    return this.http.post<any>(`${environment.webUrl}v1/design/core/change-password`, formData).pipe(map(user => user));
  }

  getScreenList(): Observable<any> {
    const wallId = localStorage.getItem('selectedWallId');
    return this.http.get<any>(`${environment.webUrl}v1/design/core/wall/screen?wallId=${wallId}`).pipe(map(list => list));
  }

  getLayoutIds(): Observable<any> {
    return this.http.get<any>(`${environment.webUrl}v1/design/core/layoutType`).pipe(map(layout => layout));
  }

  addNewScreenInList(body): Observable<any> {
    return this.http.post<any>(`${environment.webUrl}v1/design/core/screen`, body).pipe(map(newScreen => newScreen));
  }

  getScreenDetails(screenUserId): Observable<any> {
    return this.http.get<any>(`${environment.webUrl}v1/design/core/screen?userId=${screenUserId}`).pipe(map(userId => userId));
  }

  getContentTypeIds(): Observable<any> {
    return this.http.get<any>(`${environment.webUrl}v1/design/core/contentType`).pipe(map(userId => userId));
  }

  getExistingContentData(contentTypeId): Observable<any> {
    let accountId = localStorage.getItem('selectedAccountId');
    return this.http.get<any>(`${environment.webUrl}v1/design/core/contentTypeItem?accountId=${accountId}&contentTypeId=${contentTypeId}`)
      .pipe(map(userId => userId));
  }

  //   Get - https://localhost:8444/v1/design/core/contentTypeItem?accountId=d572d0ac-3b78-11eb-8f6a-5b2190718446&contentTypeId=6c80f302-d3eb-11ea-9cdb-06a49e672dea
  // Preview - Get - https://localhost:8444/v1/design/core/screen-preview?userId=1db8ac69-4bfe-49fb-8281-18309c55ad6a

  uploadImage(file: File): Observable<any> { // test
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(`${environment.webUrl}v1/design/core/image/upload?accountId=2`, formData).pipe(map(userId => userId));
  }

  changeDesignPassword(): Observable<any> {
    let data = {
      "password": this.editScreenDetails.password,
      "userId": localStorage.getItem('userId')
    }
   return this.http.post<any>(`${environment.webUrl}v1/design/core/update-password`, data);
  }

  preview(data) {
    return this.http.put<any>(`${environment.webUrl}v1/design/core/wall`, data);
  }

  save(data: any[]): Observable<any> {
    const formData = new FormData();
    // formData.append("file", JSON.stringify(data));
    for (var key in data) {
      console.log(key, data[key]);
      // if (key == 'contents') {
      //   console.log('con');
      //   // for (var k1 in data[key]) {
      //   //   if (k1 == 'contentTypeItems') {
      //   //     for (var k2 in data[key][k1]) {
      //   //       if (k1 == 'contentTypeItems') {

      //   //       }
      //   //     }
      //   //   }
      //   // }

      //   // formData.append(
      //   //   'contents',
      //   //   new Blob( [ JSON.stringify( data[key] ) ], { type : 'application/json' } ) );

      // } else {
      formData.append(key, data[key]);
      // }
    }
    console.log('data', data);
    return this.http.post<any>(`${environment.webUrl}v1/design/core/saveScreen`, data).pipe(map(save => save));
  }

  getImageTransition(contentTypeId): Observable<any> {
    return this.http.get<any>(`${environment.webUrl}v1/design/core/transition?contentTypeId=${contentTypeId}`).pipe(map(tr => tr));
    // /v1/design/core/transition?contentTypeId=1
  }
}
