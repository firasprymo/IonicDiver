import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccountPage } from '../account/account.page';
import { ModalBaseComponent } from '../components/modal-base/modal-base.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalBaseComponent,
      componentProps: { rootPage: AccountPage }
    });

    await modal.present();

  }
}
