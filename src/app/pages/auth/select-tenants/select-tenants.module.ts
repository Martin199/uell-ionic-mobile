import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectTenantsPageRoutingModule } from './select-tenants-routing.module';

import { SelectTenantsPage } from './select-tenants.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonContent, IonToolbar, IonButtons, IonButton, IonIcon, IonText, IonItem, IonSelect, IonSelectOption } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SelectTenantsPageRoutingModule,
        SharedModule,
        IonContent,
        IonToolbar,
        IonButtons,
        IonButton,
        IonIcon,
        IonText,
        IonItem,
        IonSelect,
        IonSelectOption
    ],
    declarations: [SelectTenantsPage]
})
export class SelectTenantsPageModule { }
