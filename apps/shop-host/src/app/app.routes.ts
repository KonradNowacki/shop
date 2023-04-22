import { Route } from '@angular/router';
import {AppComponent} from "./app.component";

export const appRoutes: Route[] = [
  {
    path: 'products',
    loadChildren: () => import('shop-all-products/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    component: AppComponent,
  },
];
