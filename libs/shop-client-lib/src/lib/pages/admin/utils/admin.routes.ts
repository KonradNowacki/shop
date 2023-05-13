import {Route} from "@angular/router";

import {AdminShellComponent} from "../feature/admin-shell/admin-shell.component";
import {inject} from "@angular/core";
import {AuthService} from "@shop/shop-client-lib";
import {AdminProductsComponent} from "../feature/admin-products/admin-products.component";
import {
  AdminProductAddShellComponent
} from "../feature/admin-products-add/feature/admin-product-add-shell/admin-product-add-shell.component";

export const adminRoutes: Route[] = [
  {
    path: '',
    component: AdminShellComponent, // TODO KN LoadComponent/Children
    canMatch: [() => inject(AuthService).isLoggedIn()],
    canActivateChild: [() => inject(AuthService).isLoggedIn()],
    children: [
      {
        path: 'products',
        component: AdminProductsComponent
      },
      {
        path: 'products/add',
        component: AdminProductAddShellComponent
      },

    ]
  },
]