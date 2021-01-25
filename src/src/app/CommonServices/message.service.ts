import  { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    emailId: string;
    backClicked: boolean;

    setEmail(val: string) {
        this.emailId = val;
    }

    getMessage() {
       return this.emailId;
    }

    setBackClicked(val: boolean) {
      this.backClicked  = val;
    }

    getBackClicked() {
     return this.backClicked;
    }

}
