import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslocoModule} from "@ngneat/transloco";
import {TypedFormGroup} from "@shop/common-utils";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {errorTailorImports} from "@ngneat/error-tailor";
import {SigninModel} from "../../+state/signin.model";
import {AuthCardComponent, ButtonComponent, InputComponent} from "@shop/common-ui";

@Component({
  selector: 'shop-signin-card',
  standalone: true,
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" errorTailor>
      <shop-auth-card [title]="'label.sign-in' | transloco">

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
        </div>

        <div actions>
          <button
            shop-button
            variant="outline"
            color="secondary"
            type="button"
          >{{ 'button.cancel' | transloco }}</button>

          <button
            shop-button
          >{{ 'button.sign-in' | transloco }}</button>
        </div>

      </shop-auth-card>
    </form>
  `,
  styleUrls: ['./signin-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AuthCardComponent, InputComponent, ButtonComponent,
    TranslocoModule, ReactiveFormsModule, errorTailorImports, AuthCardComponent, InputComponent, ButtonComponent
  ],
})
export class SigninCardComponent {
  @Input() form!: FormGroup<TypedFormGroup<SigninModel>>;
  @Output() readonly submitForm = new EventEmitter<SigninModel>();

  protected submit(): void {
    if (this.form.valid) {
      const payload = this.form.value as SigninModel
      this.submitForm.emit(payload)
    }
  }
}
