import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WellnessPortalPageRoutingModule } from './wellness-portal-routing.module';

import { WellnessPortalPage } from './wellness-portal.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WellnessPortalPageRoutingModule,
    SharedModule
  ],
  declarations: [WellnessPortalPage]
})
export class WellnessPortalPageModule {}
