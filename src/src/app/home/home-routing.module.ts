import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { WallListingComponent } from './wall-listing/wall-listing.component';
import { AuthGuard } from '../commonGuards/authGuard/auth.guard';
import { NavigationGuard } from '../commonGuards/backNavigation/navigation.guard';
import { WallDesignHolderComponent } from './wall-design-holder/wall-design-holder.component';
import { WallDesignComponent } from './wall-design/wall-design.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],  children: [
    //   { path: '', component: WallListingComponent, canDeactivate: [NavigationGuard]
    //   // canDeactivate: [NavigationGuard], canActivate: [SavepopupGuard] canActivate: [AuthGuard],
    // },
    { path: 'wall-listing', component: WallListingComponent, canDeactivate: [NavigationGuard]}
      // { path: 'change-user-password', component: ChangeUserpasswordComponent, canActivate: [SavepopupGuard]}
    ]
  },
  {
    path: 'wall', component: WallDesignHolderComponent, children: // canActivate: [AuthGuard],
      [
        {
          path: 'wall-design', component: WallDesignComponent, children: [ // canActivate: [SavepopupGuard],
            // { path: '', redirectTo: 'content-box-1', pathMatch: 'full' },
            // { path: 'content-box-1', component: WallResponseComponent },
            // { path: 'content-box-2', component: SkipLogicComponent, canActivate: [SkipGuard], }
          ]
        },
      ]
  }
];

@NgModule({
  imports: [
    RouterModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
