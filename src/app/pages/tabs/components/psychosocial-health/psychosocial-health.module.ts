import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsychosocialHealthPageRoutingModule } from './psychosocial-health-routing.module';

import { PsychosocialHealthPage } from './psychosocial-health.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsychosocialHealthPageRoutingModule,
    SharedModule
  ],
  declarations: [PsychosocialHealthPage]
})
export class PsychosocialHealthPageModule {}
