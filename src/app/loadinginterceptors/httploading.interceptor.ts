import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, empty, Observable, throwError } from 'rxjs';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { delay, map, retryWhen, take, tap, catchError, finalize, switchMap } from 'rxjs/operators';
import { FakehttpService } from '../shared/services/fakehttp.service';

@Injectable()
export class HttpRequestinterceptor implements HttpInterceptor {
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private fakehttpService: FakehttpService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingController.getTop().then(async hasLoading => {
      if (!hasLoading) {

        const loading = await this.loadingController.create({

          translucent: true,
          spinner: 'circular'
        });
        await loading.present();

      }
    })

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>err).status) {
            case 401:
              return this.handle401Error(request, next)
            default:
              return throwError(err);
          }
        } else {
          return throwError(err);
        }
      }),
      retryWhen(err => {
        let retries = 1;
        return err.pipe(delay(1000),
          tap(() => {
            this.showretrytoast(retries)
          }),
          map(error => {
            if (retries++ === 3) {
              throw error;
            }
            return error;
          })
        )
      }),
      catchError(err => {
        console.log('error', err);
        this.presentFailedAlert(err.error['msg']);
        return EMPTY;
      }),
      finalize(() => {
        this.loadingController.getTop().then(async hasLoading => {
          if (hasLoading) {
            this.loadingController.dismiss();
          }
        });
      })
    );
  }
  async showretrytoast(retryCount) {
    const toast = await this.toastController.create({
      message: `Retry:${retryCount}/3`,
      duration: 1000
    });
    toast.present();
  }
  async presentFailedAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log('Refresh token');
    return this.fakehttpService.getToken().pipe(
      switchMap(res => {
        console.log('in switchmap:', res);
        const token = res['token'];
        request = request.clone({
          setParams: {
            token
          }
        });
        return next.handle(request);
      })
    )

  }
}
