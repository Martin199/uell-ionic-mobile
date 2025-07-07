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
        loadComponent: () =>
          import('./home-nutrition/home-nutrition.component').then((m) => m.HomeNutritionComponent),
      },
      {
        path: 'my-results',
        loadComponent: () =>
          import('./my-result-nutrition/my-result-nutrition.component').then(
            (m) => m.MyResultNutritionComponent
          ),
      },
      {
        path: 'steps-feeding',
        loadComponent: () =>
          import('./components/stages-feeding/stages-feeding.component').then(
            (m) => m.StagesFeedingComponent
          ),
      },
      {
        path: 'steps-preference',
        loadComponent: () =>
          import('./components/stages-preference/stages-preference.component').then(
            (m) => m.StagesPreferenceComponent
          ),
      },
      {
        path: 'meal-plan',
        loadComponent: () =>
          import('./meal-plan/pages/meal-plan-home/meal-plan-home.component').then(
            (m) => m.MealPlanHomeComponent
          ),
      },
      {
        path: 'meal-details',
        loadComponent: () =>
          import('./meal-plan/pages/meal-details/meal-details.component').then(
            (m) => m.MealDetailsComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionPageRoutingModule {}
