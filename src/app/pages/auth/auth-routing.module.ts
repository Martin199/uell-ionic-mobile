import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'recovery-password',
    loadChildren: () => import('./recovery-password/recovery-password.module').then( m => m.RecoveryPasswordPageModule)
  },
  {
    path: 'select-tenants',
    loadChildren: () => import('./select-tenants/select-tenants.module').then( m => m.SelectTenantsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./../tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'term-and-conditions',
    loadChildren: () => import('./term-and-conditions/term-and-conditions.module').then( m => m.TermAndConditionsPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
