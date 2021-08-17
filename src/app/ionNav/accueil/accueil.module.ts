import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccueilPageRoutingModule } from './accueil-routing.module';

import { AccueilPage } from './accueil.page';
import { ModalBaseComponent } from '../components/modal-base/modal-base.component';
import { SharedComponentsModule } from '../components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccueilPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [AccueilPage],
  // entryComponents:[ModalBaseComponent]
})
export class AccueilPageModule {}
