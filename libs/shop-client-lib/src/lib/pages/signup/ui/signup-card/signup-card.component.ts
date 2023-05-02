import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthCardComponent, ButtonComponent, InputComponent} from "@shop/shared-ui";
import {SignupModel, TypedFormGroup} from "@shop/shared-ts";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {errorTailorImports} from "@ngneat/error-tailor";

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
          >Sign up
          </button>
        </div>

      </shop-auth-card>
    </form>
  `,
  styleUrls: ['./signup-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AuthCardComponent, InputComponent, ButtonComponent, ReactiveFormsModule, errorTailorImports],
})
export class SignupCardComponent {
  @Input() form!: FormGroup<TypedFormGroup<SignupModel>>;
  @Output() readonly submitForm = new EventEmitter<SignupModel>();

  protected submit(): void {
    console.log(this.form.value)
  }

}
