import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { Address } from '../../classes/addresses';
import { Ingredients } from 'src/app/classes/ingredients/ingredients';
import { DeleteRequest } from 'src/app/classes/base/requests';

@Injectable({ providedIn: 'root' })

export class IngredientsService {
  baseRoute = "ingredients/api/";
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

  List(): Observable<void> {
    return this.http.get<void>(Address.Get(this.baseRoute, 'all'), this.httpOptions);
  }

  Create(request: Ingredients): Observable<Ingredients> {
    return this.http.post<Ingredients>(Address.Get(this.baseRoute, 'create'), request, this.httpOptions)
  }

  Update(request: Ingredients): Observable<Ingredients> {
    return this.http.put<Ingredients>(Address.Get(this.baseRoute, 'update'), request, this.httpOptions)
  }

  Delete(request: DeleteRequest): Observable<DeleteRequest> {
    return this.http.post<DeleteRequest>(Address.Get(this.baseRoute, 'delete'), request, this.httpOptions)
  }
}
