import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTenantsPageRoutingModule } from './select-tenants-routing.module';

import { SelectTenantsPage } from './select-tenants.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectTenantsPageRoutingModule,
    SharedModule
  ],
  declarations: [SelectTenantsPage]
})
export class SelectTenantsPageModule {}
