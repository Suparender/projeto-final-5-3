import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacypolicesPage } from './privacypolices.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacypolicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacypolicesPageRoutingModule {}
