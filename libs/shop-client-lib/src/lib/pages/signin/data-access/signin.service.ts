import {inject, Injectable} from "@angular/core";
import {SigninModel} from "../+state/signin.model";
import {SigninFacade} from "../+state/signin.facade";

@Injectable()
export class SigninService {

  // TODO KN Inject store signin facade that emits to store
  private readonly signinFacade = inject(SigninFacade);

  signin(credentials: SigninModel): void {
    this.signinFacade.signin(credentials);
  }

}
