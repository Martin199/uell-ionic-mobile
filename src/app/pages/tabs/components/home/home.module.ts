import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardPsicosocialComponent } from './views/card-psicosocial/card-psicosocial.component';
import { CardWellnessPortalComponent } from './views/card-wellness-portal/card-wellness-portal.component';
import { CardMentalStatusComponent } from './views/card-mental-status/card-mental-status.component';
import { CardEmotionsMapComponent } from './views/card-emotions-map/card-emotions-map.component';
import { IonContent, IonCard, IonCardContent, IonImg, IonLabel, IonSpinner, IonButton, IonIcon, IonProgressBar } from "@ionic/angular/standalone";
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HomePageRoutingModule,
        SharedModule,
        IonContent,
        IonCard,
        IonCardContent,
        IonImg,
        IonLabel,
        IonSpinner,
        IonCard,
        IonCardContent,
        IonImg,
        IonLabel,
        IonButton,
        IonCard,
        IonCardContent,
        IonIcon,
        IonLabel,
        IonProgressBar,
        IonImg,
        IonButton,
        IonCard,
        IonCardContent,
        IonIcon,
        IonLabel,
        IonButton,
        RoundProgressModule
    ],
    declarations: [
        HomePage,
        CardPsicosocialComponent,
        CardWellnessPortalComponent,
        CardMentalStatusComponent,
        CardEmotionsMapComponent,
    ],
    exports: [CardPsicosocialComponent],
})
export class HomePageModule { }
