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
    <form [formGroup]="form" (ngSubmit)="submit()" errorTailor>
      <shop-auth-card [title]="'Sign in'">
        <div content>
          <shop-input
            [label]="'E-mail'"
            [control]="form.controls.email"
            type="email"
          ></shop-input>

          <shop-input
            [label]="'Password'"
            [control]="form.controls.password"
          ></shop-input>

          <shop-input
            [label]="'Repeat password'"
            [control]="form.controls.repeatedPassword"
          ></shop-input>
        </div>

        <div actions>
          <button
            shop-button
            variant="outline"
            color="secondary"
            type="button"
          >Cancel
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
    if (this.form.valid) {
      const payload = this.form.value as SignupModel
      this.submitForm.emit(payload)
    }
  }

}
