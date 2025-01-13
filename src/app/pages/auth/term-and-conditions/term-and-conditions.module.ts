import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermAndConditionsPageRoutingModule } from './term-and-conditions-routing.module';

import { TermAndConditionsPage } from './term-and-conditions.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TermAndConditionInfoComponent } from './view/term-and-condition-info/term-and-condition-info.component';
import { InformedConsentInfoComponent } from './view/informed-consent-info/informed-consent-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermAndConditionsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [TermAndConditionsPage, TermAndConditionInfoComponent, InformedConsentInfoComponent]
})
export class TermAndConditionsPageModule {}
