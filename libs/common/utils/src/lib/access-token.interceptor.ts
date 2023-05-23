import {HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from "@angular/core";

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const accessToken = localStorage.getItem('access_token') // TODO KN Use service!

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}` // TODO Use util well typed function to build this
    }
  })

  return next(newReq);
};

// TODO KN Interesting case of using interceptor
// export function AuthorizationInterceptor(req: HttpRequest<unknown>,
//                                          next: HttpHandlerFn){
//   const loadingService = inject(LoadingService);
//   loadingService.startLoader();
//   const clonedRequest = request.clone({ setHeaders: {
//       Authorization: 'this_is_angular' } });
//   return next(clonedRequest)
//     .pipe(finalize(() => this.loadingService.stopLoader()))
// }
