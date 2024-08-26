import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../environments/enviroment'
import { User } from '../core/interfaces/user.interface';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = Environment.apiUrl;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}
  
  postUser(user: User): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/usuario`, user, { responseType: 'text' as 'json' });
  }

  setAuthenticated(status: boolean) {
    this.isAuthenticatedSubject.next(status);
  }
  
  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }
}
