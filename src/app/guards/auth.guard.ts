import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Wait until loading is complete before making a decision
    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        console.log("🚀 ~ AuthGuard ~ canActivate ~ isAuthenticated:", isAuthenticated)

        if (isAuthenticated) {
          console.log('Authenticated, proceeding to requested route...');
          return true;
        }
        console.log('Not authenticated, redirecting to login page...');
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
