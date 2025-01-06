import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectTenantsPage } from './select-tenants.page';

const routes: Routes = [
  {
    path: '',
    component: SelectTenantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectTenantsPageRoutingModule {}
