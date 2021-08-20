import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadinginterceptorsPage } from './loadinginterceptors.page';

const routes: Routes = [
  {
    path: '',
    component: LoadinginterceptorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadinginterceptorsPageRoutingModule {}
