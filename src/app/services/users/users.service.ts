import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../../classes/users/requests';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'mon-jeton'
    })
  };

  constructor(
    private http: HttpClient
) { }

  Login(request: LoginRequest): Observable<LoginRequest> {
    return this.http.post<LoginRequest>('https://cocotte.azurewebsites.net/users/api/login', JSON.stringify(request), this.httpOptions);
  }
}
