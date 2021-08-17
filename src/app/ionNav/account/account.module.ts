import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { SettingsPage } from '../settings/settings.page';
import { SettingsPageModule } from '../settings/settings.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    SettingsPageModule
  ],
  declarations: [AccountPage],
  // entryComponents:[SettingsPage]
})
export class AccountPageModule {}
