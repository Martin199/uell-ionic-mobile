import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserContactInfoPageRoutingModule } from './user-contact-info-routing.module';

import { UserContactInfoPage } from './user-contact-info.page';
import { ARGContactInfoComponent } from './arg-contact-info/arg-contact-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { COLContactInfoComponent } from './col-contact-info/col-contact-info.component';
import { PERContactInfoComponent } from './per-contact-info/per-contact-info.component';
import { ECUContactInfoComponent } from './ecu-contact-info/ecu-contact-info.component';
import { IonLabel } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UserContactInfoPageRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        IonLabel
    ],
    declarations: [UserContactInfoPage, ARGContactInfoComponent, COLContactInfoComponent, PERContactInfoComponent, ECUContactInfoComponent],
    exports: [UserContactInfoPage]
})
export class UserContactInfoPageModule { }
