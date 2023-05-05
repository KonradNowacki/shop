import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {SignupActions} from "./signup.actions";
import {exhaustMap} from "rxjs";
import {AuthService} from "../../../api/auth.service";

@Injectable()
export class SignupEffects {

  private readonly $actions = inject(Actions);
  private readonly authService = inject(AuthService);

  createUser$ = createEffect(() => {
    return this.$actions.pipe(
      ofType(SignupActions.createuser),
      exhaustMap(({ user }) => {
        console.log('from effect')
        return this.authService.createUser(user)
      })
    )
  }, { dispatch: false })

}
