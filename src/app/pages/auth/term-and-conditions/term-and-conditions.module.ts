import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermAndConditionsPageRoutingModule } from './term-and-conditions-routing.module';

import { TermAndConditionsPage } from './term-and-conditions.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TermAndConditionInfoComponent } from './view/term-and-condition-info/term-and-condition-info.component';
import { InformedConsentInfoComponent } from './view/informed-consent-info/informed-consent-info.component';
import { IonContent, IonToolbar, IonButtons, IonButton, IonIcon, IonCheckbox, IonHeader, IonTitle } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TermAndConditionsPageRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        IonContent,
        IonToolbar,
        IonButtons,
        IonButton,
        IonIcon,
        IonCheckbox,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonIcon,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonIcon,
        IonContent
    ],
    declarations: [TermAndConditionsPage, TermAndConditionInfoComponent, InformedConsentInfoComponent]
})
export class TermAndConditionsPageModule { }
