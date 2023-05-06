import {inject, Injectable} from "@angular/core";
import {SignupModel} from "./signup.model";
import {Store} from "@ngrx/store";
import {SignupActions} from "./signup.actions";

@Injectable()
export class SignupFacade {

  private readonly store = inject(Store);

  createUser(user: SignupModel): void {
    this.store.dispatch(SignupActions.createuser({ user }))
  }

}
