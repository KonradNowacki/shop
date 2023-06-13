import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import {
  forwardRef,
  importProvidersFrom,
  inject,
  Injectable,
  isDevMode,
} from '@angular/core';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HashMap,
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule,
  TranslocoService,
} from '@ngneat/transloco';
import { accessTokenInterceptor, ErrorKey } from '@shop/common-utils';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { JwtModule } from '@auth0/angular-jwt';
import { UploadBoxComponent } from '@shop/common-ui';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    provideEffects(),
    provideStore(),

    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),

    provideHttpClient(withInterceptors([accessTokenInterceptor])),

    importProvidersFrom(
      TranslocoModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('access_token'),
        },
      })
    ),

    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'pl'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },

    provideErrorTailorConfig({
      errors: {
        useFactory: (t: TranslocoService) => {
          const key = (error: ErrorKey, params?: HashMap) =>
            t.translate(`error.${error}`, { ...params });

          return {
            [ErrorKey.REQUIRED]: () => key(ErrorKey.REQUIRED),
            [ErrorKey.EMAIL]: () => key(ErrorKey.EMAIL),
            [ErrorKey.MIN_LENGTH]: ({ requiredLength }) =>
              key(ErrorKey.MIN_LENGTH, { requiredLength }),
            [ErrorKey.SPECIAL_CHAR_REQUIRED]: () =>
              key(ErrorKey.SPECIAL_CHAR_REQUIRED),
            [ErrorKey.CAPITAL_LETTER_REQUIRED]: () =>
              key(ErrorKey.CAPITAL_LETTER_REQUIRED),
            [ErrorKey.NUMBER_REQUIRED]: () => key(ErrorKey.NUMBER_REQUIRED),
            [ErrorKey.EMAIL_NOT_UNIQUE]: () => key(ErrorKey.EMAIL_NOT_UNIQUE),
          };
        },
        deps: [TranslocoService],
      },
    }),

    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => UploadBoxComponent),
    //   multi: true,
    // },


  ],
}).catch((err) => console.error(err));
