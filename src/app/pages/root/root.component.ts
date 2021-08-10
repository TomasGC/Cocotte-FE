import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { IsEmpty } from 'src/app/classes/tools';
import { LanguageTypes } from 'src/app/classes/users/users';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  constructor(private cookieService: CookieService,
    public translate: TranslateService) {
      var languageTypes: string[] = Object.keys(LanguageTypes);
      languageTypes = languageTypes.slice(languageTypes.length / 2);

      translate.addLangs(languageTypes);

      var language = this.cookieService.get('language');
      if (IsEmpty(language)) {
        language = translate.getBrowserLang();
        this.ChangeLanguage(language);
      }

      translate.setDefaultLang(language);
      translate.use(language);
  }

  ngOnInit(): void {
  }

  ChangeLanguage(language): void {
    this.cookieService.set('language', language);
    this.translate.use(language);
  }
}
