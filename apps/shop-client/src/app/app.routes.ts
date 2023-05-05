import { Route } from '@angular/router';
import {
  ProductDetailsShellComponent,
  ProductsListShellComponent,
  SigninShellComponent, signupRoutes,
} from "@shop/shop-client-lib";

export const appRoutes: Route[] = [
  { path: 'signup', children: signupRoutes },
  { path: 'signin', component: SigninShellComponent },
  { path: 'products', component: ProductsListShellComponent },
  { path: 'products/:productId', component: ProductDetailsShellComponent },
];
