import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermAndConditionsPage } from './term-and-conditions.page';
import { TermAndConditionInfoComponent } from './view/term-and-condition-info/term-and-condition-info.component';
import { InformedConsentInfoComponent } from './view/informed-consent-info/informed-consent-info.component';

const routes: Routes = [
  {
    path: '',
    component: TermAndConditionsPage
  },
  {
    path: 'termConditionInfo',
    component: TermAndConditionInfoComponent
  },
  {
    path: 'informedConsent',
    component: InformedConsentInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermAndConditionsPageRoutingModule {}
