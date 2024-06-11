import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  //isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  token = '';
  url = environment.api_url;
  session = environment.session;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Preferences.get({ key: this.session.TOKEN_KEY });

    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    }
    else {
      if (token.value) {
        alert("please sign in again."); //TODO TOAST
      }

      this.isAuthenticated.next(false);
    }
  }

  login(credentials : any) {
    return this.http.post(`${this.url}/api/v2/auth/signin`, credentials, this.headers).pipe(
      map((data: any) => data),
      switchMap(async data => {
        return from(Preferences.set({ key: this.session.TOKEN_KEY, value: data.token }));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  async logout(): Promise<void> {
    await Preferences.clear();
    this.isAuthenticated.next(false);
  }
}