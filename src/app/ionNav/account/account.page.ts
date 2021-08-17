import { Component, OnInit } from '@angular/core';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  settingsPage = SettingsPage
  constructor() { }

  ngOnInit() {
  }

}
