import { Observable, throwError, BehaviorSubject, of, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Platform, ToastController } from '@ionic/angular';
import {  catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  token$ = new BehaviorSubject(environment.token);
  myToast: any;
  constructor(
    private platform: Platform,
    private toastCtrl: ToastController) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {



    let cloneReq = this.addToken(request,);

    return next.handle(cloneReq).pipe(catchError(error => {
      console.log(error);

      let msg = error.error.message;
      this.presentToast(msg, 'danger', 'top');
      throw error;
    }))
    }





    // request = request.clone({
    //   setHeaders: {
    //     authorization: `Bearer ${this.token$}`
    //   }
    // });
    // return next.handle(request);


    //   // Retry on faillure
    //   retry(2),
    //   catchError((error, caught) => {
    //     console.error(error);
    //     if (error.status === 0) {
    //       this.presentToast('Probléme serveur! \n Veuillez patienter SVP...', 'danger', 'middle');
    //     }
    //     if (error.status === 400) {
    //       this.presentToast(error?.error?.message, 'danger', 'middle');
    //     }
    //     // if (error.status === 401) {
    //     //   this.handleAuthError();
    //     //   return of(error);
    //     // }
    //     if (error.status === 500) {
    //       this.handleServer();
    //       return of(error);
    //     }
    //     throw error;
    //   }));


  private addToken(request: HttpRequest<any>) {
    // console.log(token);

    // if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTU4NzUwY2JkYmFkMzg2Y2EwM2JlZCIsImlhdCI6MTYyOTAwMTQwMCwiZXhwIjoxNjI5MDkxNDAwfQ.ffw06e_Mjg49JsgfIAyTpoTI3OopiI9ys-04Cz8cw54`
        }
      })
      return clone;
    // }
    return request;
  }
  // getToken(): Observable<any> {
  //   return this.storage.get(environment.token).pipe(map(res => { this.token$ = res; }));
  // }
  // public jwt() {


  //   this.getToken();
  //   const headers = new HttpHeaders({ authorization: 'Bearer ' + this.token$ });
  //   //   console.log(headers);
  //   return ({ headers });
  // }

  // private typeError() {
  //   return this.presentToast('Votre session est expiré', 'danger', 'top');
  // }
  // private handleAuthError() {
  //   this.authService.logout();
  //   this.typeError();
  // }
  // private handleServer() {
  //   this.presentToast('Probléme Serveur veuillez patienter Svp...', 'danger', 'middle');
  // }
  async presentToast(message, color, position) {
    this.myToast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position
    }).then((toastData) => {
      toastData.present();
    });
  }

}
