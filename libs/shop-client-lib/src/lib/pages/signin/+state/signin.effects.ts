import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../../api/auth.service";
import {SigninActions} from "./signin.actions";
import {catchError, EMPTY, exhaustMap, tap} from "rxjs";

@Injectable()
export class SigninEffects {

  private readonly $actions = inject(Actions);
  private readonly authService = inject(AuthService);

  signin$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(SigninActions.signin),
      exhaustMap(({ credentials }) => {
        const { email, password } = credentials;
        return this.authService.signin(email, password).pipe(
          tap(({ access_token }) => {
            // TODO KN MOve this logic to service
            localStorage.setItem('access_token', access_token)
          }),
          catchError(() => {
            // TODO KN Handle error
            return EMPTY
          })
        )
      })
    )
  }, { dispatch: false })

}
