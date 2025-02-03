import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoveryPasswordPage } from './recovery-password.page';
import { CreateNewPasswordComponent } from './view/create-new-password/create-new-password.component';

const routes: Routes = [
  {
    path: '',
    component: RecoveryPasswordPage
  },
  {
    path: 'security-code',
    component: CreateNewPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoveryPasswordPageRoutingModule {}
