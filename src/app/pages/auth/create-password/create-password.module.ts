import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePasswordRoutingModule } from './create-password-routing.module';
import { CreatePasswordPage } from './create-password.page';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CreatePasswordPage],
  imports: [
    CommonModule,
    CreatePasswordRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class CreatePasswordModule { }
