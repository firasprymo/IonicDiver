import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
// import { DatePipe } from "@angular/common";
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  public static remoteAdress = environment.apiUrl;
  public static apiUSER = UtilsService.remoteAdress + 'users/';
  public static apiACTION = UtilsService.remoteAdress + 'actions/';
  public static apiCLIENT = UtilsService.remoteAdress + 'clients/';
  public static apiOPERATION = UtilsService.remoteAdress + 'operations/';
  public static apiPost = UtilsService.remoteAdress + 'posts/';
  public static apiComment = UtilsService.remoteAdress + 'comments/';
  token: any;
  myToast: any;
  header: any;

  constructor(
    private httpClient: HttpClient,
    private toastCtrl: ToastController
  ) {
    // this.jwt().subscribe(res => this.header = res);
    // this.jwt();
  }
  public async presentToast(message, color, position) {
    this.myToast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position
    });
    this.myToast.present();
  }

  public post(url: string, object: any): Observable<any> {
    // console.log(this.header);

    return this.httpClient
      .post<Object>(url, object).pipe(map(res => res), catchError(this.formatErrors));
  }

  public patch(url: string, object: any): Observable<any> {
    return this.httpClient.patch(url, object).pipe(map(res => res), catchError(this.formatErrors));
  }
  public put(url: string, object: any): Observable<any> {
    return this.httpClient.put(url, object).pipe(map(res => res), catchError(this.formatErrors));
  }

  public get(url: string): Observable<any> {
    const headers = new HttpHeaders({ authorization: 'Bearer ' + this.token });
    return this.httpClient.get<Object>(url, { observe: 'response' }).pipe(map(res => res.body), catchError(this.formatErrors));
  }

  public delete(url: string): Observable<any> {
    return this.httpClient.delete(url).pipe(map(res => res), catchError(this.formatErrors));
  }
  private formatErrors(error: HttpErrorResponse) {
    console.log(error);

    return throwError(error.error);

  }


}
