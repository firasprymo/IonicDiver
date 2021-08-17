import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBaseComponent } from './modal-base/modal-base.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ModalBaseComponent],
  exports:[ModalBaseComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedComponentsModule { }
