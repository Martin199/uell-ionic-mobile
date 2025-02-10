import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserContactInfoPageRoutingModule } from './user-contact-info-routing.module';

import { UserContactInfoPage } from './user-contact-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserContactInfoPageRoutingModule
  ],
  declarations: [UserContactInfoPage],
  exports: [UserContactInfoPage]
})
export class UserContactInfoPageModule {}
