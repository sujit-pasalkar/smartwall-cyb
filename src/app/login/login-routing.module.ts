import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: WelcomeComponent },
  // {path: 'signUp', component: ChangePasswordComponent},
  // { path: 'change-password', component: ChangePasswordComponent },
  { path: 'forgot-password-url-expired', component: ForgotPasswordComponent },
  // { path: 'reset-password', component: ResetPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
