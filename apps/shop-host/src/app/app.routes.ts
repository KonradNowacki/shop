import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const appRoutes: Route[] = [
  {
    path: 'products',
    loadChildren: () =>
      import('shop-all-products/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    component: AppComponent,
    providers: [provideStore(), provideEffects()],
  },
];
