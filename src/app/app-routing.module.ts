import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '', redirectTo: 'login', pathMatch: 'full'
},
{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
},
{
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
},
{
  path: 'image-upload',
  loadChildren: () => import('./image-upload/image-upload.module').then(m => m.ImageUploadPageModule)
},
{
  path: 'loading',
  loadChildren: () => import('./loadinginterceptors/loadinginterceptors.module').then(m => m.LoadinginterceptorsPageModule)
},
{
  path: 'lazy',
  loadChildren: () => import('./lazyloadimage/lazyloadimage.module').then(m => m.LazyloadimagePageModule)
},
{
  path: 'details',
  loadChildren: () => import('./lazyloadimage/details/details.module').then(m => m.DetailsPageModule)
},
{
  path: 'infinitescroll',
  loadChildren: () => import('./infinitescroll/infinitescroll.module').then(m => m.InfinitescrollPageModule)
},
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('./ionNav/account/account.module').then( m => m.AccountPageModule)
  // },
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./ionNav/settings/settings.module').then( m => m.SettingsPageModule)
  // },
  // {
  //   path: 'accueil',
  //   loadChildren: () => import('./ionNav/accueil/accueil.module').then( m => m.AccueilPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
