import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {provideErrorTailorConfig} from "@ngneat/error-tailor";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'This field is required',
          // minlength: ({ requiredLength, actualLength }) =>
          //   `Expect ${requiredLength} but got ${actualLength}`,
          // invalidAddress: error => `Address isn't valid`
        }
      },
    })

  ],
}).catch((err) => console.error(err));
