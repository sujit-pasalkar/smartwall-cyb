import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotExistComponent } from './page-not-exist.component';

const routes: Routes = [{ path: '', component: PageNotExistComponent }];

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '**',
      component: PageNotExistComponent
  }
  ])],
  exports: [RouterModule]
})
export class PageNotExistRoutingModule { }
