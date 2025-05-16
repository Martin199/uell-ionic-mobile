import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PsychosocialHealthPageRoutingModule } from './psychosocial-health-routing.module';

import { PsychosocialHealthPage } from './psychosocial-health.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageModule } from '../home/home.module';
import { CardAnswersComponent } from './views/card-answers/card-answers.component';
import { IonContent, IonCard, IonRow, IonCol, IonTitle, IonButton, IonIcon, IonLabel } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PsychosocialHealthPageRoutingModule,
        SharedModule,
        HomePageModule,
        IonContent,
        IonCard,
        IonRow,
        IonCol,
        IonTitle,
        IonButton,
        IonIcon,
        IonLabel
    ],
    declarations: [PsychosocialHealthPage, CardAnswersComponent]
})
export class PsychosocialHealthPageModule { }
