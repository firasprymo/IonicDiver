import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LazyloadimagePage } from './lazyloadimage.page';

const routes: Routes = [
  {
    path: '',
    component: LazyloadimagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyloadimagePageRoutingModule {}
