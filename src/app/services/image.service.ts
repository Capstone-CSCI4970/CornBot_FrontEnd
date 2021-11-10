import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageModel } from '../models/image-model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  /**
   * gets a set of 10 random training images from the backend
   * @returns array of ImageModel objects (contains imageURL, imageID, filename, label)
   */
  getImageSet(): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>('http://localhost:8000/api/getimages/');
  }

  /**
   * posts a new user choice to backend to be saved in database
   * @param request (imageId, userID, choice)
   * @returns http response
   */
  postNewChoice(request: any): any {
    return this.http.post<any>('http://localhost:8000/api/choice/create/', request).subscribe();
  }

  trainModel(userId: string): Observable<any> {
    return this.http.get('http://localhost:8000/api/getTestAcc/' + userId);
  }
}
