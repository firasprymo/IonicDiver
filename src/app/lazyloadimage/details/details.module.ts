import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, ToastController } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { Attributes, IntersectionObserverHooks, LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS } from 'ng-lazyload-image';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable()
export class LazyLoadImageHooks extends IntersectionObserverHooks {
  toast: any;
  constructor(private toastController: ToastController) {
    super();
  };
  setup(attributes: Attributes) {
    attributes.offset = 10;
    attributes.defaultImagePath = '../../../assets/150.png';
    attributes.errorImagePath = '../../../assets/150.png';
    return super.setup(attributes);
  }
  loadImage(attributes: Attributes) {
    return from(this.toastController.create({
      message: 'start loading.',
      duration: 2000
    })).pipe(switchMap(toast => toast.present()),
      switchMap(_ => super.loadImage(attributes))
    );

  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    LazyLoadImageModule
  ],
  declarations: [DetailsPage],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: LazyLoadImageHooks }],
})
export class DetailsPageModule { }
