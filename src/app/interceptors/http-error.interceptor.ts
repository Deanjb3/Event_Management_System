import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  // Log outgoing request
  console.log(`[HTTP Interceptor] Executing request to: ${req.url}`);

  return next(req).pipe(
    tap(response => {
      // Intercept natural HTTP responses
    }),
    catchError(error => {
      console.error('[HTTP Interceptor] Request failed:', error);
      snackBar.open(`Oops! Network Error: ${error.message || 'Unable to fetch data'}`, 'Close', {
        duration: 4000,
        panelClass: ['error-snackbar'] // Requires a bit of CSS if you want red, but works fine by default
      });
      return throwError(() => new Error(error.message || 'Server Error'));
    })
  );
};
