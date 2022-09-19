import { UrlConstants } from './../constants';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppState } from '../store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.store
        .select('auth')
        .pipe(take(1))
        .subscribe((store) => {
          if (store === null || store === undefined)
            this.router.navigate([UrlConstants.login]);

          resolve(store !== null && store !== undefined);
        });
    });
  }
}
