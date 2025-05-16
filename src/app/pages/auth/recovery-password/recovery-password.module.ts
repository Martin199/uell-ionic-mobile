import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecoveryPasswordPageRoutingModule } from './recovery-password-routing.module';

import { RecoveryPasswordPage } from './recovery-password.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateNewPasswordComponent } from './view/create-new-password/create-new-password.component';
import { IonContent, IonText, IonButton, IonIcon } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RecoveryPasswordPageRoutingModule,
        SharedModule,
        IonContent,
        IonText,
        IonButton,
        IonContent,
        IonIcon,
        IonButton
    ],
    declarations: [RecoveryPasswordPage, CreateNewPasswordComponent]
})
export class RecoveryPasswordPageModule { }
