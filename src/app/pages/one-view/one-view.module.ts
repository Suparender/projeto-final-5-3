import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OneViewPageRoutingModule } from './one-view-routing.module';

import { OneViewPage } from './one-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OneViewPageRoutingModule
  ],
  declarations: [OneViewPage]
})
export class OneViewPageModule {}
