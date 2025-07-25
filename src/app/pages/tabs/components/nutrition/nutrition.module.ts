import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionPageRoutingModule } from './nutrition-routing.module';
import { NutritionPage } from './nutrition.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyResultNutritionComponent } from './my-result-nutrition/my-result-nutrition.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { HomeNutritionComponent } from './home-nutrition/home-nutrition.component';

@NgModule({
    imports: [
        CommonModule,
        NutritionPageRoutingModule,
        SharedModule,
        RoundProgressModule,
        MyResultNutritionComponent,
        HomeNutritionComponent
    ],
    declarations: [
        NutritionPage, 
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NutritionPageModule { }
