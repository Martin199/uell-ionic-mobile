import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasswordPage } from './create-password.page';

const routes: Routes = [
    {
      path: '',
      component: CreatePasswordPage
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePasswordRoutingModule { }
