import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      switchMap((store: any) => {
        let newRequest: any;
        if (store !== null && store != undefined) {
          newRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${store.token}`,
            },
          });
        } else {
          newRequest = req.clone();
        }

        return next.handle(newRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status > 400 && error.status < 404) {
              this.router.navigate(['logout']);
            }
            return throwError(error);
          })
        );
      })
    );
  }
}
