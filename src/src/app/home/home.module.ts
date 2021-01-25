import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WallListingComponent } from './wall-listing/wall-listing.component';
import { HomeComponent } from './home.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from "@angular/material/radio";
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSelectModule } from 'ngx-select-ex';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FooterComponent } from '../core/footer/footer.component';
import { HeaderComponent } from '../core/header/header.component';
import { CoreModule } from '../core/core.module';
import { SelectClientComponent } from './wall-listing/pop-up/select-client/select-client.component';
import { CreateWallComponent } from './wall-listing/pop-up/create-wall/create-wall.component';
import { DeleteWallComponent } from './wall-listing/pop-up/delete-wall/delete-wall.component';
import { WallDesignHolderComponent } from './wall-design-holder/wall-design-holder.component';
import { WallDesignComponent } from './wall-design/wall-design.component';
import { MatTabsModule } from '@angular/material/tabs';
import { WallWidgetsComponent } from './Dailogs/wall-widgets/wall-widgets.component';
import { WallSocialMediaFeedsComponent } from './Dailogs/wall-social-media-feeds/wall-social-media-feeds.component';
import { UploadImagesComponent } from './Dailogs/upload-images/upload-images.component';
import { UploadVideosComponent } from './Dailogs/upload-videos/upload-videos.component';
import { DeleteComponent } from './Dailogs/delete/delete.component';

import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { ConfirmDeleteWallComponent } from './wall-listing/pop-up/confirm-delete-wall/confirm-delete-wall.component';
import { ContentBoxComponent } from './wall-design/content-box/content-box.component';
import { UploadImageComponent } from './wall-design/pop-up/upload-image/upload-image.component';
import { UploadVideoComponent } from './wall-design/pop-up/upload-video/upload-video.component';
import { AutofocusDirective } from './Directive/autofocus.directive';
import { BackgroundImageComponent } from './wall-design/pop-up/background-image/background-image.component';
import { AddWidgetComponent } from './wall-design/pop-up/add-widget/add-widget.component';
import { AddFeedsComponent } from './wall-design/pop-up/add-feeds/add-feeds.component';
import { ImageJwtPipe } from '../commonPipe/imgjwt/image-jwt.pipe';
import { CancelComponent } from './wall-design/pop-up/cancel/cancel.component';
import { CancelDeleteComponent } from './wall-listing/pop-up/cancel-delete/cancel-delete.component';
import { DeployComponent } from './wall-design/pop-up/deploy/deploy.component';
import { DeleteContentComponent } from './wall-design/pop-up/delete-content/delete-content.component';

@NgModule({
  declarations: [WallListingComponent, HomeComponent, SelectClientComponent, CreateWallComponent,
     DeleteWallComponent, WallDesignHolderComponent, WallDesignComponent, WallWidgetsComponent,
      WallSocialMediaFeedsComponent, UploadImagesComponent, UploadVideosComponent, DeleteComponent,
      ConfirmDeleteWallComponent, ContentBoxComponent, UploadImageComponent, UploadVideoComponent,AutofocusDirective,
      BackgroundImageComponent, AddWidgetComponent, AddFeedsComponent,
    ImageJwtPipe,
    CancelComponent,
    CancelDeleteComponent,
    DeployComponent,
    DeleteContentComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MultiSelectModule,
    MatSelectModule,
    MatTabsModule,
    SliderModule,
    RouterModule,
    NgxSpinnerModule,
    NgxSelectModule,
    DragDropModule,
    CoreModule,
    CarouselModule,
    ButtonModule,
    ToastModule
  ],
  // entryComponents: [ChangePasswordComponent]
})
export class HomeModule { }
