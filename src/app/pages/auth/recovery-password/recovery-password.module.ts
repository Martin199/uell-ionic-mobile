import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoveryPasswordPageRoutingModule } from './recovery-password-routing.module';

import { RecoveryPasswordPage } from './recovery-password.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateNewPasswordComponent } from './view/create-new-password/create-new-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoveryPasswordPageRoutingModule,
    SharedModule
  ],
  declarations: [RecoveryPasswordPage, CreateNewPasswordComponent]
})
export class RecoveryPasswordPageModule {}
