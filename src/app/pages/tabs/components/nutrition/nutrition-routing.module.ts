import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutritionPage } from './nutrition.page';
import { MyResultNutritionComponent } from './my-result-nutrition/my-result-nutrition.component';
import { HomeNutritionComponent } from './home-nutrition/home-nutrition.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionPageRoutingModule {}
