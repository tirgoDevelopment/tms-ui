import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { env } from 'environments/environment';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private eventSource: EventSource;
  private receivedDataSubject = new Subject<any>();

  constructor(private authService: AuthService) {}

  getUpdates(): Observable<any> {
    if(this.authService.accessToken) {
      const token = this.authService.accessToken;
      this.eventSource = new EventSource(env.authApiUrl + '/sse/events?token=' + token);
  
      this.eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.receivedDataSubject.next(data);
      };
  
      this.eventSource.onerror = (error) => {
        console.error('Error with SSE connection:', error);
      };
      return this.receivedDataSubject.asObservable();
    } 
    else {
      return of(null);
    }
  }

  closeConnection(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
