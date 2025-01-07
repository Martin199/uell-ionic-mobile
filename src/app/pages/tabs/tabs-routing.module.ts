import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'nutrition',
        loadChildren: () => import('./components/nutrition/nutrition.module').then( m => m.NutritionPageModule)
      },
      {
        path: 'psychosocial-health',
        loadChildren: () => import('./components/psychosocial-health/psychosocial-health.module').then( m => m.PsychosocialHealthPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
     ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
