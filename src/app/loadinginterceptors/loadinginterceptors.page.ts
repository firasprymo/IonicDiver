import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FakehttpService } from '../shared/services/fakehttp.service';

@Component({
  selector: 'app-loadinginterceptors',
  templateUrl: './loadinginterceptors.page.html',
  styleUrls: ['./loadinginterceptors.page.scss'],
})
export class LoadinginterceptorsPage implements OnInit {

  constructor(private fakehttp: FakehttpService,
    private toastController: ToastController) { }

  ngOnInit() {
  }
  getSuccess() {
    this.fakehttp.getSuccess().subscribe(res => {
      console.log('getSuccess', res);
      this.showToast(res['msg']);

    });
  }
  getFailed() {
    this.fakehttp.getFailed().subscribe(res => {
      console.log('getFailed', res);


    });
  }
  getRetryFailed() {
    this.fakehttp.getRetryFailed().subscribe(res => {
      console.log('getRetryFailed', res);
      this.showToast(res['msg']);

    });
  }
  getAuthFailed() {
    this.fakehttp.getAuthFailed().subscribe(res => {
      console.log('getAuthFailed', res);
      this.showToast(res['msg']);

    });
  }
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
