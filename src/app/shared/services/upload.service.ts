import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "environments/environment";
import { Observable } from "rxjs";



@Injectable({ providedIn: 'root' })

export class UploadService {
  constructor(
    private http: HttpClient
  ) { }

  uploadAvatar(data): Observable<any> {
    return this.http.post(env.apiUrl + '/file/upload', data);
  }
}