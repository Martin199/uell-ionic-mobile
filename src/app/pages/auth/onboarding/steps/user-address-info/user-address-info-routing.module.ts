import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddressInfoComponent } from './user-address-info.component';

const routes: Routes = [
  {
    path: '',
    component: UserAddressInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAddressInfoRoutingModule { }
