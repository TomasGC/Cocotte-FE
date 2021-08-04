import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { Address } from '../../classes/addresses';
import { DataConfigTypes, LanguageTypes } from 'src/app/classes/configuration/dataConfigs';

@Injectable({ providedIn: 'root' })

export class ConfigurationService {
  baseRoute = "configuration/api/";
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

  GetSignalRServer(): Observable<void> {
    return this.http.get<void>(Address.Get(this.baseRoute, 'signalr'), this.httpOptions);
  }

  GetDataConfigs(type: DataConfigTypes): Observable<void> {
    return this.http.get<void>(Address.Get(this.baseRoute, 'data-config/' + type), this.httpOptions);
  }
}
