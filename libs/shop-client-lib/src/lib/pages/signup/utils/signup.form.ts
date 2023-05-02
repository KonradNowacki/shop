import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailString, SignupModel, TypedFormGroup} from "@shop/shared-ts";

@Injectable()
export class SignupForm {

  buildForm(): FormGroup<TypedFormGroup<SignupModel>> {
    return new FormGroup({
      email: new FormControl<EmailString | null>(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl<string | null>(null),
      repeatedPassword: new FormControl<string | null>(null),
    }, { updateOn: 'change' })
  }


}
