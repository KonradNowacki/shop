import {Route} from '@angular/router';
import {
  ProductDetailsShellComponent,
  ProductsListShellComponent,
  signinRoutes,
  signupRoutes,
} from "@shop/shop-client-lib";
import {adminRoutes} from "../../../../libs/shop-client-lib/src/lib/pages/admin/utils/admin.routes";


export const appRoutes: Route[] = [
  {path: 'signup', children: signupRoutes},
  {path: 'signin', children: signinRoutes},
  {
    path: 'admin',
    children: adminRoutes
  }, // TODO KN Check if userId === loggedInUserId
  {path: 'products', component: ProductsListShellComponent},
  {path: 'products/:productId', component: ProductDetailsShellComponent},
];
