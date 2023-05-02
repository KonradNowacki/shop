import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthCardComponent, ButtonComponent, InputComponent} from "@shop/shared-ui";

@Component({
  selector: 'shop-signin-card',
  standalone: true,
  imports: [CommonModule, AuthCardComponent, InputComponent, ButtonComponent],
  template: `
    <shop-auth-card [title]="'Sign in'">

      <div content>
<!--        <shop-input [label]="'E-mail'"></shop-input>-->
<!--        <shop-input [label]="'Password'"></shop-input>-->
      </div>

      <div actions>
        <button
          shop-button
          variant="outline"
          color="secondary"
          type="button"
        >Cancel</button>

        <button
          shop-button
          type="button"
        >Sign in</button>
      </div>

    </shop-auth-card>
  `,
  styleUrls: ['./signin-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninCardComponent {}
