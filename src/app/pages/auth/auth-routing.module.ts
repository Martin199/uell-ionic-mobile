import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';
import { MyProfileComponent } from './onboarding/components/my-profile/my-profile.component';
import { ClinicalHistoryOnboardingComponent } from './onboarding/components/clinical-history-onboarding/clinical-history-onboarding.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpPageModule),
  },
  {
    path: 'recovery-password',
    loadChildren: () => import('./recovery-password/recovery-password.module').then(m => m.RecoveryPasswordPageModule),
  },
  {
    path: 'select-tenants',
    loadChildren: () => import('./select-tenants/select-tenants.module').then(m => m.SelectTenantsPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./../tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'term-and-conditions',
    loadChildren: () =>
      import('./term-and-conditions/term-and-conditions.module').then(m => m.TermAndConditionsPageModule),
  },
  {
    path: 'onboarding',
    children: [
      {
        path: 'my-profile',
        loadComponent: () =>
          import('./onboarding/components/my-profile/my-profile.component').then(m => m.MyProfileComponent),
      },
      {
        path: 'clinical-history',
        loadComponent: () =>
          import('./onboarding/components/clinical-history-onboarding/clinical-history-onboarding.component').then(
            m => m.ClinicalHistoryOnboardingComponent
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'my-profile',
      },
    ],
  },
  {
    path: 'create-new-password',
    loadChildren: () => import('./create-password/create-password.module').then(m => m.CreatePasswordModule),
  },
  {
    path: 'support',
    loadComponent: () => import('./support/support.component').then(m => m.SupportComponent),
  },
  {
    path: 'create-account',
    children: [
      {
        path: 'business-code',
        loadComponent: () => import('./create-account/create-account.component').then(m => m.CreateAccountComponent),
      },
      {
        path: 'validate-account',
        loadComponent: () =>
          import('./validate-account/validate-account.component').then(m => m.ValidateAccountComponent),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'business-code',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
