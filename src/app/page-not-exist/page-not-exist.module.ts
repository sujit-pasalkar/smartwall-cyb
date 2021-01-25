import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotExistRoutingModule } from './page-not-exist-routing.module';
import { PageNotExistComponent } from './page-not-exist.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [PageNotExistComponent],
  imports: [
    CommonModule,
    CoreModule,
    PageNotExistRoutingModule
  ]
})
export class PageNotExistModule { }
