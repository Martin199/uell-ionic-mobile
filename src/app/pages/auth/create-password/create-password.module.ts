import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePasswordRoutingModule } from './create-password-routing.module';
import { CreatePasswordPage } from './create-password.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonContent, IonText, IonInput, IonButton, IonSpinner } from "@ionic/angular/standalone";

@NgModule({
    declarations: [CreatePasswordPage],
    imports: [
        CommonModule,
        CreatePasswordRoutingModule,
        SharedModule,
        IonContent,
        IonText,
        IonInput,
        IonButton,
        IonSpinner
    ]
})
export class CreatePasswordModule { }
