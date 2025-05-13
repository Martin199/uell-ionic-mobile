import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NutritionPageRoutingModule } from './nutrition-routing.module';

import { NutritionPage } from './nutrition.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonContent } from "@ionic/angular/standalone";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NutritionPageRoutingModule,
        SharedModule,
        IonContent
    ],
    declarations: [NutritionPage]
})
export class NutritionPageModule { }
