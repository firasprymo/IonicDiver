import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadinginterceptorsPageRoutingModule } from './loadinginterceptors-routing.module';

import { LoadinginterceptorsPage } from './loadinginterceptors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadinginterceptorsPageRoutingModule
  ],
  declarations: [LoadinginterceptorsPage]
})
export class LoadinginterceptorsPageModule {}
