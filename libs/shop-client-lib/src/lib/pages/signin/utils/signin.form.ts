import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailString, TypedFormGroup} from "@shop/shared-ts";
import {SigninModel} from "../+state/signin.model";

@Injectable()
export class SigninForm {
  buildForm(): FormGroup<TypedFormGroup<SigninModel>> {
    return new FormGroup({
        email: new FormControl<EmailString | null>(null, {
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl<string>('', {
          validators: [Validators.required]
        }),
      }, {
        updateOn: 'change'
      }
    )
  }
}
