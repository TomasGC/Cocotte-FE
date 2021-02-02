import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { Address } from '../../classes/addresses';
import { Recipes } from 'src/app/classes/recipes/recipes';

@Injectable({ providedIn: 'root' })

export class RecipesService {
  baseRoute = "recipes/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.cookieService.get('sessionKey')
    })
  };

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  List(): Observable<void> {
    return this.http.get<void>(Address.Get(this.baseRoute, 'all'), this.httpOptions);
  }

  Create(request: Recipes): Observable<Recipes> {
    return this.http.post<Recipes>(Address.Get(this.baseRoute, 'create'), request, this.httpOptions)
  }

  Update(request: Recipes): Observable<Recipes> {
    return this.http.put<Recipes>(Address.Get(this.baseRoute, 'update'), request, this.httpOptions)
  }

  Delete(id: string): Observable<void> {
    return this.http.delete<void>(Address.Get(this.baseRoute, 'delete/' + id), this.httpOptions)
  }
}
