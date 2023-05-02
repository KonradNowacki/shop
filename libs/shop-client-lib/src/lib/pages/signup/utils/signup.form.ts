import {Injectable} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {EmailString, ErrorKey, SignupModel, TypedFormGroup} from "@shop/shared-ts";

@Injectable()
export class SignupForm {

  buildForm(): FormGroup<TypedFormGroup<SignupModel>> {
    return new FormGroup({
      email: new FormControl<EmailString | null>(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl<string | null>(null, {
        validators: [this.passwordValidator(), Validators.minLength(8)]
      }),
      repeatedPassword: new FormControl<string | null>(null),
    }, { updateOn: 'change' })
  }

  private passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value

      if (!password) {
        return { [ErrorKey.REQUIRED]: true }
      }

      if (!/[0-9]+/.test(password)) {
        return { [ErrorKey.NUMBER_REQUIRED]: true }
      }

      if (!/[A-Z]+/.test(password)) {
        return { [ErrorKey.CAPITAL_LETTER_REQUIRED]: true }
      }

      if (!/[!@#$%^&*()]+/.test(password)) {
        return { [ErrorKey.SPECIAL_CHAR_REQUIRED]: true }
      }

      return null;
    };
  }

}
