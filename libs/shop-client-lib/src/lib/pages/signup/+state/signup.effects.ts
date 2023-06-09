import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SignupActions } from './signup.actions';
import { exhaustMap } from 'rxjs';
import { AuthApiService } from '../../../api/auth-api.service';

@Injectable()
export class SignupEffects {
  private readonly $actions = inject(Actions);
  private readonly authService = inject(AuthApiService);

  createUser$ = createEffect(
    () => {
      return this.$actions.pipe(
        ofType(SignupActions.createUser),
        exhaustMap(({ user }) => {
          console.log('from effect');
          return this.authService.createUser(user);
        })
      );
    },
    { dispatch: false }
  );
}
