import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Image } from '../model/image';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly url = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getImages():Observable<any> {
    return this.http.get<Object>(`${this.url}posts`).pipe(map(res=>res));
  }
  deleteImage(id) {
    return this.http.delete(`${this.url}posts/${id}`)
  }
  uploadImage(blobData,name,ext) {
    const formData = new FormData();
    formData.append('photo', blobData, `myImage.${ext}`);
    formData.append('name', name);
    return this.http.post(`${this.url}posts`, formData);
  }
  uploadImageFile(file: File) {
    console.log(file.name);

    const ext = file.name.split('.').pop();
    const formData = new FormData();
    formData.append('photo', file, `myImage.${ext}`);
    formData.append('name', file.name);
    return this.http.post(`${this.url}posts`, formData);
  }

}
