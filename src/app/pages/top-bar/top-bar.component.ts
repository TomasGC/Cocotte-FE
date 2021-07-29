import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { LanguageType } from 'src/app/classes/configuration/dataConfig';
import { IsEmpty } from 'src/app/classes/tools';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {
  title = 'Cocotte';

  constructor(private router: Router,
    private cookieService: CookieService,
    public translate: TranslateService) {
    translate.addLangs([LanguageType.fr.toString(), LanguageType.en.toString()]);

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

  GoToHome(): void {
    this.router.navigate(['/home']);
  }

  ChangeLanguage(language): void {
    this.cookieService.set('language', language);
    this.translate.use(language);
  }
}
