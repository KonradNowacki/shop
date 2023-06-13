import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SigninCardComponent } from '../../ui/signin-card/signin-card.component';
import { SigninService } from '../../data-access/signin.service';
import { SigninModel } from '../../+state/signin.model';
import { SigninFacade } from '../../+state/signin.facade';
import { SigninForm } from '../../utils/signin.form';
import {
  AuthCardComponent,
  ButtonComponent,
  InputComponent,
} from '@shop/common-ui';

@Component({
  selector: 'shop-signin-shell',
  standalone: true,
  imports: [
    AuthCardComponent,
    ButtonComponent,
    InputComponent,
    SigninCardComponent,
  ],
  template: `
    <main>
      <shop-signin-card
        [form]="form"
        (submitForm)="submitForm($event)"
      ></shop-signin-card>
    </main>
  `,
  styleUrls: ['./signin-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SigninService, SigninFacade, SigninForm],
})
export class SigninShellComponent {
  protected readonly form = inject(SigninForm).buildForm();
  private readonly signinService = inject(SigninService);

  submitForm(credentials: SigninModel): void {
    if (this.form.valid) {
      this.signinService.signin(credentials);
    }
  }
}
