import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/api/auth/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AutoLoginGuard  {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canLoad(): Observable<any> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null), 
      take(1),
      map(async isAuthenticated => {
        if (isAuthenticated) {
          await this.router.navigateByUrl('/home', { replaceUrl: true });
          return false;
        }
        return true;
      })
    );
  }
}
