import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NutritionPageRoutingModule } from './nutrition-routing.module';

import { NutritionPage } from './nutrition.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyResultNutritionComponent } from './my-result-nutrition/my-result-nutrition.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { AnthropometryDetailComponent } from './anthropometry-detail/anthropometry-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NutritionPageRoutingModule,
        SharedModule,
        RoundProgressModule
    ],
    declarations: [NutritionPage, MyResultNutritionComponent, AnthropometryDetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NutritionPageModule { }
