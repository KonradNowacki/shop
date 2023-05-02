import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthCardComponent, ButtonComponent, InputComponent} from "@shop/shared-ui";
import {SigninCardComponent} from "../../ui/signin-card/signin-card.component";
import {SigninService} from "../../data-access/signin.service";

@Component({
  selector: 'shop-signin-shell',
  standalone: true,
  imports: [AuthCardComponent, ButtonComponent, InputComponent, SigninCardComponent],
  template: `
    <main>
<!--        <shop-signin-card-->
<!--            (submitForm)="submitForm($event)"-->
<!--        ></shop-signin-card>-->
    </main>
  `,
  styleUrls: ['./signin-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SigninService]
})
export class SigninShellComponent {

  private readonly signinService = inject(SigninService)

  submitForm(): void {



  }

}
