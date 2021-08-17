import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable()
export class H401Interceptor implements HttpInterceptor {
  private myToast: any;
  constructor(private authService: AuthService,
    private toastr: ToastController) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError(

        (err, caught) => {
          console.log(err.statusText);
          console.log(err);
          if (err.status === 401 && err.statusText === 'Unauthorized') {
            this.handleAuthError();
            return of(err);
          }
          if (err.status === 500) {
            this.handleServer();
            return of(err);
          }
          this.presentToast(err.error.message, 'danger', 'top');
          throw err;
        }
      )
    );
  }
  private typeError() {
    return this.presentToast('Votre session est expiré', 'danger', 'top');
  }
  private handleAuthError() {

    this.authService.logout();
    this.typeError();
  }
  private handleServer() {

    this.presentToast('Probléme Serveur veuillez patienter Svp...', 'danger', 'middle');
  }
  private async presentToast(message, color, position) {
    this.myToast = await this.toastr.create({
      message,
      duration: 2000,
      color,
      position
    }).then((toastData) => {
      toastData.present();
    });
  }
}
