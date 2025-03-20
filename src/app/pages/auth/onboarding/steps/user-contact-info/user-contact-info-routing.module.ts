import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserContactInfoPage } from './user-contact-info.page';

const routes: Routes = [
  {
    path: '',
    component: UserContactInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserContactInfoPageRoutingModule {}
