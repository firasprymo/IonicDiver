import { Component, OnInit } from '@angular/core';
import { AccountPage } from '../account/account.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  rootPage = AccountPage;
  constructor() { }

  ngOnInit() {
  }

}
