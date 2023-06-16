import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from '../../../api/auth-api.service';
import { SigninActions } from './signin.actions';
import { catchError, EMPTY, exhaustMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import {StorageKey} from "@shop/common-utils";

@Injectable()
export class SigninEffects {
  private readonly $actions = inject(Actions);
  private readonly authService = inject(AuthApiService);
  private readonly router = inject(Router);

  signin$ = createEffect(
    () => {
      return this.$actions.pipe(
        ofType(SigninActions.signin),
        exhaustMap(({ credentials }) => {
          const { email, password } = credentials;
          return this.authService.signin(email, password).pipe(
            tap(({ access_token }) => {
              // TODO KN MOve this logic to service
              localStorage.setItem(StorageKey.ACCESS_TOKEN, access_token);

              this.router.navigateByUrl('products');
            }),
            catchError(() => {
              // TODO KN Handle error
              return EMPTY;
            })
          );
        })
      );
    },
    { dispatch: false }
  );
}
