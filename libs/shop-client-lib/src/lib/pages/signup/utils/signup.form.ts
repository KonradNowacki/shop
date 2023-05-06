import {inject, Injectable} from "@angular/core";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {EmailString, ErrorKey, TypedFormGroup} from "@shop/shared-ts";
import {SignupModel} from "../+state/signup.model";
import {AuthService} from "../../../api/auth.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {catchError, debounceTime, distinctUntilChanged, EMPTY, map, switchMap, take, tap} from "rxjs";

@UntilDestroy()
@Injectable()
export class SignupForm {

  private readonly authService = inject(AuthService);

  buildForm(): FormGroup<TypedFormGroup<SignupModel>> {
    return new FormGroup({
      email: new FormControl<EmailString | null>(null, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [ this.isEmailUnique() ]
      }),
      password: new FormControl<string>('', {
        validators: [this.passwordValidator(), Validators.minLength(8)]
      }),
      repeatedPassword: new FormControl<string>(''),
    }, {
      updateOn: 'change'
    }
    )
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

  private isEmailUnique(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        debounceTime(300),
        take(1),
        switchMap(email => {
          return this.authService.isEmailUnique(email).pipe(
            map(res => res ? { [ErrorKey.EMAIL_NOT_UNIQUE]: true } : null)
          )
        })
      )
    }
  }

}
