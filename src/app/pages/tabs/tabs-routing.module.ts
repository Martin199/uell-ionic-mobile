import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile.component').then((m) => m.ProfileComponent),
      },
 
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
