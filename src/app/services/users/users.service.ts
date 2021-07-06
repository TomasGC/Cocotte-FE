import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../../classes/users/requests';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { Address } from '../../classes/addresses';
import { Users } from 'src/app/classes/users/users';
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

  Get(): Observable<void> {
    return this.http.get<void>(Address.Get(this.baseRoute, 'user'), this.httpOptions);
  }

  Create(request: LoginRequest): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(Address.Get(this.baseRoute, 'user/create'), JSON.stringify(request), this.httpOptions);
  }

  Update(request: Users): Observable<Users> {
    return this.http.put<Users>(Address.Get(this.baseRoute, 'user/update'), JSON.stringify(request), this.httpOptions);
  }
}
