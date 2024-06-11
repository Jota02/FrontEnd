import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/api/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }
        else {
          this.router.navigate(['/signin'], { replaceUrl: true });
          return false;
        }
      })
    );
  }
}