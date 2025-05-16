import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WellnessPortalPageRoutingModule } from './wellness-portal-routing.module';

import { WellnessPortalPage } from './wellness-portal.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { OptimizedImageComponent } from 'src/app/shared/componentes/optimized-image/optimized-image.component';
import { RecommendedWellnessPortalComponent } from './components/recommended-wellness-portal/recommended-wellness-portal.component';
import { CarouselWellnessPortalComponent } from './components/carousel-wellness-portal/carousel-wellness-portal.component';
import { MultimediaIframeComponent } from "../../../../shared/componentes/multimedia-iframe/multimedia-iframe.component";
import { DetailsWellnessPortalComponent } from './components/details-wellness-portal/details-wellness-portal.component';
import { IonContent, IonToolbar, IonButtons, IonButton, IonIcon, IonImg } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WellnessPortalPageRoutingModule,
        SharedModule,
        OptimizedImageComponent,
        MultimediaIframeComponent,
        IonContent,
        IonContent,
        IonToolbar,
        IonButtons,
        IonButton,
        IonIcon,
        IonImg
    ],
    declarations: [
        WellnessPortalPage,
        RecommendedWellnessPortalComponent,
        CarouselWellnessPortalComponent,
        DetailsWellnessPortalComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WellnessPortalPageModule { }
