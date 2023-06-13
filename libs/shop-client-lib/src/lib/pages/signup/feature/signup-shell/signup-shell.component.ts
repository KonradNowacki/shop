import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AuthCardComponent,
  ButtonComponent,
  InputComponent,
} from '@shop/common-ui';
import { SignupCardComponent } from '../../ui/signup-card/signup-card.component';
import { SignupService } from '../../data-access/signup.service';

import { SignupForm } from '../../utils/signup.form';
import { SignupModel } from '../../+state/signup.model';
import { SignupFacade } from '../../+state/signup.facade';

@Component({
  selector: 'shop-signup-shell',
  standalone: true,
  template: `
    <main>
      <shop-signup-card
        [form]="form"
        (submitForm)="submitForm($event)"
      ></shop-signup-card>
    </main>
  `,
  styleUrls: ['./signup-shell.component.scss'],
  imports: [
    AuthCardComponent,
    InputComponent,
    ButtonComponent,
    SignupCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SignupService, SignupForm, SignupFacade],
})
export class SignupShellComponent {
  protected readonly form = inject(SignupForm).buildForm();
  private readonly signupService = inject(SignupService);

  submitForm(payload: SignupModel): void {
    console.log('from SignupShellComponent');
    this.signupService.submit(payload);
  }
}
