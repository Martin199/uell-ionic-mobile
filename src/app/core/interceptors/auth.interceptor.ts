import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CognitoService } from '../services/cognito.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cognitoService = inject(CognitoService);
  const token = sessionStorage.getItem('accessToken');
 const tenant = sessionStorage.getItem('tenant');
 // Validar si tenant tiene un valor antes de parsear name_tenant
 const name_tenant = tenant ? JSON.parse(tenant) : null;
  const clonedRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Tenant: name_tenant?.name ?? 'uell',
        },
      })
    : req;

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return cognitoService.refreshToken().pipe(
          switchMap((newToken) => {
            const retryRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
                'Content-Type': 'application/json',
                Tenant: name_tenant?.name ?? 'uell',
              },
            });
            return next(retryRequest);
          }),
          catchError((refreshError) => {
            cognitoService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
