import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from "@shop/shared-ui";

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'shop-root',
  template: `
    <shop-navbar></shop-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
