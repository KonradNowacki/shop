import {inject, Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly jwtHelper = inject(JwtHelperService)

  getLoggedInUser() {
    return this.jwtHelper.decodeToken()?.user?.email;
  }

  getLoggedInUserId(): number {
    return this.jwtHelper.decodeToken()?.user?.id;
  }

  isLoggedIn(): boolean {
    return !<boolean>this.jwtHelper.isTokenExpired();
  }

  logout(): void {
    localStorage.removeItem('access_token')
  }

}
