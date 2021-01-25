import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from '../app/login/login.module';
import { LoginService } from './login/login.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AuthGuard } from './commonGuards/authGuard/auth.guard';
import { TokenInterceptorServiceService } from './CommonServices/token-interceptor-service.service';
import { NgxSelectModule } from 'ngx-select-ex';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
// import { ChangePasswordComponent } from './core/change-password-dialog/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    // ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSelectModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    MatSliderModule,
    MatCheckboxModule,
    MatDialogModule,
    NgxSpinnerModule,
    NgxSpinnerModule,
    CoreModule,
    HomeModule,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorServiceService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
