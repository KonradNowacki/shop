import {inject, Injectable} from "@angular/core";
import {SigninModel} from "./signin.model";
import {Store} from "@ngrx/store";
import {SigninActions} from "./signin.actions";


@Injectable()
export class SigninFacade {

  private readonly store = inject(Store);

  signin(credentials: SigninModel): void {
    this.store.dispatch(SigninActions.signin({ credentials }))
  }

}
