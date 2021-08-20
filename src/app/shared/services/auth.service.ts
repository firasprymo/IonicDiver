
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable, BehaviorSubject, of } from 'rxjs';
import { UtilsService } from './utils.service';
import { Storage } from '@ionic/storage';
@Injectable()
export class AuthService {
  role: any;
  user: Observable<any>;
  private authState = new BehaviorSubject(null);
  myToast: any;
  constructor(private utilsSer: UtilsService,
    public http: HttpClient,
    public toastCtrl: ToastController,
    private storage: Storage,
    private router: Router) {
    this.user = this.authState.asObservable();
  }

  login(user): Observable<any> {
    console.log(user);

    return this.utilsSer.post(UtilsService.apiUSER + 'login', user).pipe(map((res: any) => {
      this.authState.next(res);
      this.storage.set(environment.currentUser, res);
      return of(res);
    }));
  }






}
