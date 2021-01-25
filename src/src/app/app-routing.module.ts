import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { WelcomeComponent } from './login/welcome/welcome.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
// import { ChangePasswordComponent } from './login/change-password/change-password.component';

const appRoutes: Routes = [
  {
    path: '', component: LoginComponent, children:
      [
        { path: '', component: WelcomeComponent },
        { path: 'login', component: WelcomeComponent },
        { path: 'reset-password', component: ResetPasswordComponent },
        { path: 'forgot-password', component: ForgotPasswordComponent },
        // { path: 'change-password', component: ChangePasswordComponent },
        { path: 'forgot-password-url-expired', component: ForgotPasswordComponent },
      ]
  }, {
    path: 'home',
    loadChildren: () => import('../app/home/home.module')
      .then(h => h.HomeModule)
  },
  // {
  //   path: 'wall',
  //   loadChildren: () => import('../app/wall/wall.module')
  //     .then(s => s.WallModule)
  // },
  // { path: 'page-not-exist', loadChildren: () => import('./page-not-exist/page-not-exist.module').then(m => m.PageNotExistModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
