import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { Address } from '../../classes/addresses';
import { Weeks, Day } from 'src/app/classes/weeks/weeks';
import { WeekIngredients } from 'src/app/classes/weeks/weekIngredients';
import { DeleteRequest } from 'src/app/classes/base/requests';

@Injectable({ providedIn: 'root' })

export class WeeksService {
  baseRoute = "weeks/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.cookieService.get('sessionKey')
    })
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  Generate(): Observable<void> {
    return this.http.get<void>(Address.Get(this.baseRoute, 'generate'), this.httpOptions);
  }

  UpdateDay(request: Day): Observable<Day> {
    return this.http.put<Day>(Address.Get(this.baseRoute, 'update/day'), request, this.httpOptions)
  }

  Update(request: Weeks): Observable<Weeks> {
    return this.http.put<Weeks>(Address.Get(this.baseRoute, 'update/day'), request, this.httpOptions)
  }

  Delete(request: DeleteRequest): Observable<DeleteRequest> {
    return this.http.post<DeleteRequest>(Address.Get(this.baseRoute, 'delete'), request, this.httpOptions)
  }

  Current(): Observable<void> {
    return this.http.get<void>(Address.Get(this.baseRoute, 'current'), this.httpOptions);
  }

  GetWeekIngredients(): Observable<void> {
    return this.http.get<void>(Address.Get(this.baseRoute, 'current/ingredients/all'), this.httpOptions);
  }

  UpdateWeekIngredients(request: WeekIngredients): Observable<WeekIngredients> {
    return this.http.put<WeekIngredients>(Address.Get(this.baseRoute, 'current/ingredients/update'), request, this.httpOptions)
  }
}
