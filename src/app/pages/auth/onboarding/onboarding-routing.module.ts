import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingPage } from './onboarding.page';
import { UserInfoComponent } from './steps/user-info/user-info.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingPage,
    children: [
        {
          path: '',
          component: UserInfoComponent
        }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingPageRoutingModule {}
