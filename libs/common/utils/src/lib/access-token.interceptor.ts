import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import {StorageKey} from "./constants";

export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem(StorageKey.ACCESS_TOKEN); // TODO KN Use service!

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`, // TODO Use util well typed function to build this
    },
  });

  return next(newReq);
};
