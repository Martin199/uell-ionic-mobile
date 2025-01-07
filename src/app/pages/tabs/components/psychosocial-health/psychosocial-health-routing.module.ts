import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsychosocialHealthPage } from './psychosocial-health.page';

const routes: Routes = [
  {
    path: '',
    component: PsychosocialHealthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsychosocialHealthPageRoutingModule {}
