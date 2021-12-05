import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  /**
   * sends get request with image of maize leaf, returns a base64 image url with blight detected
   */
  getCNNImage(request: any, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Token ' + token
      })
    };
    return this.http.post<any>('http://localhost:8000/api/getUpload/', request, httpOptions);
  }
}
