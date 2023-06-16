import { ActivatedRouteSnapshot, Route } from '@angular/router';

import { AdminShellComponent } from '../feature/admin-shell/admin-shell.component';
import { inject } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { AdminProductsComponent } from '../feature/admin-products/feature/admin-products.component';
import { AdminProductAddShellComponent } from '../feature/admin-products-add/feature/admin-product-add-shell/admin-product-add-shell.component';
import { AdminProductsFacade } from '../+store/admin-products.facade';
import { provideEffects } from '@ngrx/effects';
import { AdminProductsEffects } from '../+store/admin-products.effects';
import { AdminProductsService } from '../data-access/admin-products.service';
import { AdminProductDetailsComponent } from '../feature/admin-product-details/admin-product-details.component';
import {QueryParam, RouterData} from '@shop/common-utils';

export const adminRoutes: Route[] = [
  {
    path: '',
    component: AdminShellComponent, // TODO KN LoadComponent/Children
    canMatch: [() => inject(AuthService).isLoggedIn()],
    canActivateChild: [() => inject(AuthService).isLoggedIn()],
    providers: [
      AdminProductsFacade,
      AdminProductsService,
      provideEffects(AdminProductsEffects),
    ],
    children: [
      {
        path: 'products',
        component: AdminProductsComponent,
      },
      {
        path: 'products/add',
        component: AdminProductAddShellComponent,
      },
      {
        path: `products/edit/:${QueryParam.PRODUCT_ID}`,
        component: AdminProductAddShellComponent,
        resolve: {
          [RouterData.EDITED_PRODUCT]: (route: ActivatedRouteSnapshot) => {
            const id = route.params[QueryParam.PRODUCT_ID];
            return inject(AdminProductsService).getAdminProductDetails(id);
          },
        },
      },
      {
        path: `products/:${QueryParam.PRODUCT_ID}`,
        component: AdminProductDetailsComponent,
      },
    ],
  },
];
