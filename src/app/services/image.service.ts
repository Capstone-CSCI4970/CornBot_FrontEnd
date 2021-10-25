import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageModel } from '../models/image-model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImageSet(): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>('http://localhost:8000/api/getimages/');
  }

  postNewChoice(request: any): any {
    return this.http.post<any>('http://localhost:8000/api/choice/create/', request).subscribe();
  }
}
