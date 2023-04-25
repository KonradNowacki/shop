import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavbarComponent} from "@shop/shop-host-lib";

@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'shop-root',
  template: `
    <shop-navbar></shop-navbar>
    <router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
