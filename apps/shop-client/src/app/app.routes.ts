import { Route } from '@angular/router';
import {
  ProductDetailsShellComponent,
  ProductsListShellComponent, signinRoutes,
  signupRoutes,
} from "@shop/shop-client-lib";


export const appRoutes: Route[] = [
  { path: 'signup', children: signupRoutes },
  { path: 'signin', children: signinRoutes },
  { path: 'products', component: ProductsListShellComponent },
  { path: 'products/:productId', component: ProductDetailsShellComponent },
];
