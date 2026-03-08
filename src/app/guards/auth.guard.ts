import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  // Mock authentication logic - Assume user is logged in
  const isLoggedIn = true;

  if (isLoggedIn) {
    snackBar.open('[Auth Guard] Access granted. Welcome back!', 'Dismiss', { duration: 2500 });
    return true;
  } else {
    snackBar.open('[Auth Guard] Unauthorized! Please log in first.', 'Close', { duration: 4000 });
    router.navigate(['/']); // Redirect to home
    return false;
  }
};
