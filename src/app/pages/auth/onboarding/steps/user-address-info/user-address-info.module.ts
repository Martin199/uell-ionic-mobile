import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAddressInfoRoutingModule } from './user-address-info-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ARGAddressInfoComponent } from './arg-address-info/arg-address-info.component';
import { UserAddressInfoComponent } from './user-address-info.component';
import { AddressInfoComponent } from './address-info/address-info.component';
import { ECUAddressInfoComponent } from './ecu-address-info/ecu-address-info.component';
import { PERAddressInfoComponent } from './per-address-info/per-address-info.component';
import { AddressComponent } from 'src/app/shared/componentes/address/address.component';
import { IonLabel, IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        UserAddressInfoRoutingModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        AddressComponent,
        IonLabel,
        IonList,
        IonItem,
        IonSelect,
        IonSelectOption,
        IonList,
        IonItem,
        IonSelect,
        IonSelectOption,
        IonList,
        IonItem,
        IonSelect,
        IonSelectOption,
        IonList,
        IonItem,
        IonSelect,
        IonSelectOption
    ],
    declarations: [UserAddressInfoComponent, ARGAddressInfoComponent, AddressInfoComponent, ECUAddressInfoComponent, PERAddressInfoComponent],
    exports: [UserAddressInfoComponent]
})
export class UserAddressInfoModule { }
