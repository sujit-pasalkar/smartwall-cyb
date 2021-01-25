import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InterceptorComponent } from './interceptor/interceptor.component';
import { DesignHeaderComponent } from './design-header/design-header.component';
import { ModelPopupComponent } from './model-popup/model-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SessionTimeoutDialogComponent } from './session-timeout-dialog/session-timeout-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HomeRoutingModule } from '../home/home-routing.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent,
    // AuthenticationComponent,
    InterceptorComponent,
    // GuardsComponent,
    DesignHeaderComponent,
    ModelPopupComponent,
    SessionTimeoutDialogComponent,
    ChangePasswordDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HomeRoutingModule,
    TooltipModule.forRoot(),
    NgxSpinnerModule
  ],
  exports: [HeaderComponent, FooterComponent, DesignHeaderComponent]
})
export class CoreModule { }
