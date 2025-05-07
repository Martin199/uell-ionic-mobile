// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CognitoService } from '../services/cognito.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cognito = inject(CognitoService);

  const tenant = JSON.parse(sessionStorage.getItem('tenant') || '{}');

  const buildHeaders = (tok: string) => ({
    Authorization: `Bearer ${tok}`,
    'Content-Type': 'application/json',
    Tenant: tenant?.name ?? 'uell'
  });

  const token =
    localStorage.getItem('idToken') ??
    localStorage.getItem('accessToken') ??
    sessionStorage.getItem('accessToken');

  const authReq = token ? req.clone({ setHeaders: buildHeaders(token) }) : req;

  return next(authReq).pipe(
    catchError(err => {
      if (![0, 401, 403].includes(err.status)) {
        return throwError(() => err);
      }

      return cognito.refreshToken().pipe(
        switchMap(newTok =>
          next(req.clone({ setHeaders: buildHeaders(newTok) }))
        ),
        catchError(refreshErr => {
          cognito.logout();
          return throwError(() => refreshErr);
        })
      );
    })
  );
};
