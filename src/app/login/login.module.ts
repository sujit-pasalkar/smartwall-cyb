import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { LoginRoutingModule } from './login-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from '../core/core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [LoginComponent, WelcomeComponent, ForgotPasswordComponent, PageNotFoundComponent,
    ChangePasswordComponent,
    ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    // MatDialogModule,
    LoginRoutingModule,
    // NgxSpinnerModule,
    TooltipModule.forRoot(),
    CoreModule
  ],
  entryComponents: [
  ]
})
export class LoginModule { }
