import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {StorageKey} from "@shop/common-utils";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly jwtHelper = inject(JwtHelperService);

  getLoggedInUser() {
    return this.jwtHelper.decodeToken()?.user?.email;
  }

  isLoggedIn(): boolean {
    return !(<boolean>this.jwtHelper.isTokenExpired());
  }

  logout(): void {
    localStorage.removeItem(StorageKey.ACCESS_TOKEN);
  }
}
