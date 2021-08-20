import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FakehttpService {
  url = "http://localhost:3000";
  constructor(private http: HttpClient) { }
  getSuccess() {
    return this.http.get(`http://localhost:4112/api/v1/posts/`);
  }
  getFailed() {
    return this.http.get(`${this.url}/error1`);
  }
  getRetryFailed() {
    return this.http.get(`${this.url}/error2`);
  }
  getAuthFailed() {
    return this.http.get(`${this.url}/error3`);
  }
  getToken() {
    return this.http.get(`${this.url}/token`);
  }

}
