import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SignUpPageRoutingModule,
        SharedModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent
    ],
    declarations: [SignUpPage]
})
export class SignUpPageModule { }
