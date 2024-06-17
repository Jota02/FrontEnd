import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';

import { environment } from '../../../../environments/environment';

import { IUser } from '../../../model/i-user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  token = '';
  apiUrl = environment.api_url;
  session = environment.session;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.loadToken();
    this.apiUrl += "auth/"
  }

  async loadToken() {
    const token = await Preferences.get({ key: this.session.TOKEN_KEY });
  
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
      const toast = await this.toastController.create({
        message: 'Please sign in again.',
        duration: 3000, // duração do toast em milissegundos
        position: 'bottom', // posição do toast na tela: top, middle, bottom
        color: 'warning', // cor do toast
        cssClass: 'custom-toast' // classe CSS personalizada se desejar
      });
      await toast.present();
    }
  }

  signin(credentials : any) {
    return this.http.post(`${this.apiUrl}signin`, credentials, this.headers).pipe(
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

  signup(user: IUser): Observable<IUser> {
    const url = this.apiUrl + 'signup';
    const body = {
      name: user.name,
      email: user.email,
      password: user.password
    };

    return this.http.post<IUser>(url, body);
  }

  getAllUsers(): Observable<IUser[]> {
    const url = this.apiUrl + "get-all";

    return this.http.get<IUser[]>(url);
  }

  changePassword(user: IUser, newPassword: string){
    const url = this.apiUrl + 'change-password';
    const body = {
      email: user.email,
      oldPassword: user.password,
      newPassword: newPassword
    };

    return this.http.put(url, body);
  }

  updateVisibility(user: IUser){
    const url = this.apiUrl + 'update-visibility';
    const body = {
      id: user.id,
      isActive: user.isActive
    };

    return this.http.put(url, body);
  }

  updatePermissions(user: IUser){
    const url = this.apiUrl + 'update-permissions';
    const body = {
      id: user.id,
      isAdmin: user.isAdmin
    };

    return this.http.put(url, body);
  }


}