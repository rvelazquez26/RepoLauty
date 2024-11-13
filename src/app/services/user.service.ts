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

  constructor(private http: HttpClient) {}
  
  postUser(user: User): Observable<any> {    
    console.log(user);
    
    return this.http.post<string>(`${this.baseUrl}/api/user`, user, { responseType: 'text' as 'json' });
  }
}
