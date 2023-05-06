import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AccessTokenDto, EmailString, UserCreateDto} from "@shop/shared-ts";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly httpClient = inject(HttpClient);

  createUser(user: UserCreateDto): Observable<UserCreateDto> {
    return this.httpClient.post<UserCreateDto>('http://localhost:3000/auth/signup', {
      ...user
    })
  }

  isEmailUnique(email: EmailString): Observable<boolean> {
    return this.httpClient.post<boolean>('http://localhost:3000/auth/user-exists', {
      email
    })
  }

  signin(email: EmailString, password: string): Observable<AccessTokenDto> {
    return this.httpClient.post<AccessTokenDto>('http://localhost:3000/auth/signin', {
      email, password
    })
  }

}
