import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { AuthServices } from './auth.service';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  private authService = inject(AuthServices);
  private router = inject(Router);
  canActivate: CanActivateFn = () => {
    return this.authService.isLoggedIn().pipe(
      map((login) => {
        if (!login) {
          this.router.navigate(['/auth-login']);
          return false;
        }
        return true;
      })
    );
  };
}
// this.authService.isLoggedIn() ? this.res.set(true) : this.res.set(false);
// if(this.res() === false)
// {
//   this.router.navigate(['/auth-login']);
//   return false;
// }
// else {
//   return true;
// }
