import { Route } from '@angular/router';
import { LogoutShellComponent } from '../feature/logout-shell/logout-shell.component';

export const logoutRoutes: Route[] = [
  {
    path: '',
    component: LogoutShellComponent,
  },
];
