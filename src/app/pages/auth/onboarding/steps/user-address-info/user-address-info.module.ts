import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAddressInfoRoutingModule } from './user-address-info-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule} from '@ionic/angular';
import { ARGAddressInfoComponent } from './arg-address-info/arg-address-info.component';
import { UserAddressInfoComponent } from './user-address-info.component';
import { COLAddressInfoComponent } from './col-address-info/col-address-info.component';
import { ECUAddressInfoComponent } from './ecu-address-info/ecu-address-info.component';
import { PERAddressInfoComponent } from './per-address-info/per-address-info.component';


@NgModule({
  imports: [
    CommonModule,
    UserAddressInfoRoutingModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    
  ],
  declarations: [UserAddressInfoComponent,ARGAddressInfoComponent, COLAddressInfoComponent, ECUAddressInfoComponent, PERAddressInfoComponent],
  exports: [UserAddressInfoComponent]
})
export class UserAddressInfoModule { }
