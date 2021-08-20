import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LazyloadimagePageRoutingModule } from './lazyloadimage-routing.module';

import { LazyloadimagePage } from './lazyloadimage.page';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LazyloadimagePageRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [LazyloadimagePage]
})
export class LazyloadimagePageModule { }
