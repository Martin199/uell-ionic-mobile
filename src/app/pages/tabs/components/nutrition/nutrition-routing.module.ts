import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutritionPage } from './nutrition.page';
import { MyResultNutritionComponent } from './my-result-nutrition/my-result-nutrition.component';
import { HomeNutritionComponent } from './home-nutrition/home-nutrition.component';
import { StagesFeedingComponent } from './components/stages-feeding/stages-feeding.component';
import { StagesPreferenceComponent } from './components/stages-preference/stages-preference.component';

const routes: Routes = [
  {
    path: '',
    component: NutritionPage,
     children: [
      {
        path: '',
        component: HomeNutritionComponent
      },
      {
        path: 'my-results',
        component: MyResultNutritionComponent
      },
      {
        path: 'steps-feeding',
        component: StagesFeedingComponent
      },
      {
        path: 'steps-preference',
        component: StagesPreferenceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionPageRoutingModule {}
