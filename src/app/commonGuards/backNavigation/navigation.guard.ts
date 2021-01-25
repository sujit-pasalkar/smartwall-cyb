import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MessageService } from '../../CommonServices/message.service';
@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanDeactivate<any> {

  constructor(public service: MessageService) { }
  canDeactivate(component: any) {
    // this prevent user from going back
    if (this.service.getBackClicked()) {
      this.service.setBackClicked(false);
      // push current state again to prevent further attempts.
      history.pushState(null, null, location.href);
      return false;
    }
    return true;
  }

}
