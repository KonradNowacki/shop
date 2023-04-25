import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ButtonComponent} from "@shop/shared-ui";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'shop-navbar',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  template: `<nav>
    <div class="left-side">
      <div [routerLink]="'products'">Products</div>
    </div>
    <div class="right-side">
      <button shop-button type="outline" color="secondary">Sign up</button>
      <button shop-button color="primary">Log in</button>
    </div>
  </nav>`,
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {


}
