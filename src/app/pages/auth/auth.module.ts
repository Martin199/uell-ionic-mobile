import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonContent, IonText, IonButton } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthPageRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        IonContent,
        IonText,
        IonButton
    ],
    declarations: [AuthPage]
})
export class AuthPageModule { }
