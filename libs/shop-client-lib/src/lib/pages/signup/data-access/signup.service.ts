import { inject, Injectable } from '@angular/core';
import { SignupModel } from '../+state/signup.model';
import { SignupFacade } from '../+state/signup.facade';

@Injectable()
export class SignupService {
  private readonly signupFacade = inject(SignupFacade);

  submit(payload: SignupModel): void {
    console.log('from facade');
    this.signupFacade.createUser(payload);
  }
}
