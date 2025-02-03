import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WellnessPortalPage } from './wellness-portal.page';
import { DetailsWellnessPortalComponent } from './components/details-wellness-portal/details-wellness-portal.component';

const routes: Routes = [
  {
    path: '',
    component: WellnessPortalPage
  },
  {
    path: 'details/:id',
    component: DetailsWellnessPortalComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WellnessPortalPageRoutingModule {}
