import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthCardComponent, ButtonComponent, InputComponent} from "@shop/shared-ui";
import {TypedFormGroup} from "@shop/shared-ts";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {errorTailorImports} from "@ngneat/error-tailor";
import {TranslocoModule} from "@ngneat/transloco";
import {SignupModel} from "../../+state/signup.model";

@Component({
  selector: 'shop-signup-card',
  standalone: true,
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <shop-auth-card [title]="'label.sign-up' | transloco">
        <div content>
          <shop-input
            [label]="'label.e-mail' | transloco"
            [control]="form.controls.email"
            type="email"
          ></shop-input>

          <shop-input
            [label]="'label.password' | transloco"
            [control]="form.controls.password"
            type="password"
          ></shop-input>

          <shop-input
            [label]="'label.repeat-password' | transloco"
            [control]="form.controls.repeatedPassword"
            type="password"
          ></shop-input>
        </div>

        <div actions>
          <button
            shop-button
            variant="outline"
            color="secondary"
            type="button"
          >{{ 'button.cancel' | transloco }}
          </button>

          <button
            shop-button
          >{{ 'button.signup' | transloco }}
          </button>
        </div>

      </shop-auth-card>
    </form>
  `,
  styleUrls: ['./signup-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuthCardComponent, InputComponent, ButtonComponent, ReactiveFormsModule, errorTailorImports, TranslocoModule],
})
export class SignupCardComponent {
  @Input() form!: FormGroup<TypedFormGroup<SignupModel>>;
  @Output() readonly submitForm = new EventEmitter<SignupModel>();

  protected submit(): void {

    console.log('valid: ', this.form.valid, this.form.errors, this.form.value)
    console.log('valid: ', this.form.controls.email.valid)
    console.log('valid: ', this.form.controls.password.valid)
    console.log('valid: ', this.form.controls.repeatedPassword.valid)

    this.form.markAllAsTouched();

    if (this.form.valid) {
      const payload = this.form.value as SignupModel
      this.submitForm.emit(payload)
    }
  }

}
