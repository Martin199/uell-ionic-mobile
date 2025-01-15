import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WellnessPortalPage } from './wellness-portal.page';

const routes: Routes = [
  {
    path: '',
    component: WellnessPortalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WellnessPortalPageRoutingModule {}
