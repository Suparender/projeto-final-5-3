import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OneViewPage } from './one-view.page';

const routes: Routes = [
  {
    path: '',
    component: OneViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OneViewPageRoutingModule {}
