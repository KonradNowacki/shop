import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {provideErrorTailorConfig} from "@ngneat/error-tailor";
import {importProvidersFrom, inject, Injectable, isDevMode} from "@angular/core";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule
} from "@ngneat/transloco";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

bootstrapApplication(AppComponent, {

  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),

    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'This field is required',
          // minlength: ({ requiredLength, actualLength }) =>
          //   `Expect ${requiredLength} but got ${actualLength}`,
          // invalidAddress: error => `Address isn't valid`
        }
      },
    }),


    importProvidersFrom(TranslocoModule),
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'pl'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ],
}).catch((err) => console.error(err));
