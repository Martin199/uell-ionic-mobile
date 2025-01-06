import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const contentInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event: any) => {
      if (event instanceof HttpResponse && event.body) {
        if (event.body.content !== undefined) {
          return event.clone({ body: event.body.content });
        }
      }
      return event;
    })
  );
};
