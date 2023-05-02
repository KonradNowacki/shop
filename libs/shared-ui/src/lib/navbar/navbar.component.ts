import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {ButtonComponent} from "@shop/shared-ui";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'shop-navbar',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  template: `
    <nav>
      <div class="left-side">

      </div>
      <div class="right-side">
        <button shop-button [routerLink]="'signup'">Sign up</button>
        <button shop-button [routerLink]="'signin'">Sign in</button>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
