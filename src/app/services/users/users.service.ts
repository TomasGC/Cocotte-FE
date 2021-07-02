import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../../classes/users/requests';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { Address } from '../../classes/addresses';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseRoute = "users/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.cookieService.get('sessionKey')
    })
  };

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  Login(request: LoginRequest): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(Address.Get(this.baseRoute, 'login'), JSON.stringify(request), this.httpOptions);
  }

  Create(request: LoginRequest): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(Address.Get(this.baseRoute, 'user/create'), JSON.stringify(request), this.httpOptions);
  }
}
