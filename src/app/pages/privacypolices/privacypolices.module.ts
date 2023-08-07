import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacypolicesPageRoutingModule } from './privacypolices-routing.module';

import { PrivacypolicesPage } from './privacypolices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacypolicesPageRoutingModule
  ],
  declarations: [PrivacypolicesPage]
})
export class PrivacypolicesPageModule {}
