import { Route } from '@angular/router';
import {
  ProductDetailsShellComponent,
  ProductsListShellComponent,
  SigninShellComponent,
  SignupShellComponent
} from "@shop/shop-client-lib";

export const appRoutes: Route[] = [
  { path: 'signup', component: SignupShellComponent },
  { path: 'signin', component: SigninShellComponent },
  { path: 'products', component: ProductsListShellComponent },
  { path: 'products/:productId', component: ProductDetailsShellComponent },
];
