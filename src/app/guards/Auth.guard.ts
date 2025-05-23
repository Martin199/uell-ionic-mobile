// import type { CanActivateFn } from '@angular/router';

import { inject, Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment } from '@angular/router';
import { UserStateService } from '../core/state/user-state.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanMatch {
  userState = inject(UserStateService);
  router = inject(Router);

  constructor() {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userState.isAuthenticated();
  }
}
