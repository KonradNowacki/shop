import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { SigninShellComponent } from '@shop/shop-client-lib';
import { SigninEffects } from '../+state/signin.effects';

export const signinRoutes: Route[] = [
  {
    path: '',
    component: SigninShellComponent,
    providers: [provideEffects(SigninEffects)],
  },
];
