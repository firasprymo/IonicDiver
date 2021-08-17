import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'image-upload',
    loadChildren: () => import('./image-upload/image-upload.module').then( m => m.ImageUploadPageModule)
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
