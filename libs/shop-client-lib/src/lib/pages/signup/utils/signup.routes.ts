import {Route} from "@angular/router";
import {provideEffects} from "@ngrx/effects";
import {SignupEffects} from "../+state/signup.effects";
import {SignupShellComponent} from "@shop/shop-client-lib";

export const signupRoutes: Route[] = [
  {
    path: '',
    component: SignupShellComponent,
    providers: [
      provideEffects(SignupEffects)
    ],
  }
]
