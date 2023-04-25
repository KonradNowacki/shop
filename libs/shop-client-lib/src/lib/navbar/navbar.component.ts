import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {ButtonComponent} from "@shop/shared-ui";

@Component({
  selector: 'shop-navbar',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <nav>
      <div class="left-side">

      </div>
      <div class="right-side">
        <button shop-button>Sign up</button>
        <button shop-button>Sign in</button>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
