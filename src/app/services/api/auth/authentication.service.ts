import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, from } from 'rxjs';

import { Preferences } from '@capacitor/preferences';

import { jwtDecode } from 'jwt-decode';

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

  async getUserIdFromToken(): Promise<string | null> {
    const token = await Preferences.get({ key: this.session.TOKEN_KEY });
    if (!token || !token.value) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token.value);
      return decodedToken.id;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
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

  getUserById(id: String): Observable<IUser>  {
    const url = this.apiUrl + `get-user/${id}`;

    return this.http.get<IUser>(url);
  }

  changePassword(user: IUser, newPassword: string): Observable<IUser>{
    const url = this.apiUrl + 'change-password';
    const body = {
      email: user.email,
      oldPassword: user.password,
      newPassword: newPassword
    };

    return this.http.put<IUser>(url, body);
  }

  updateVisibility(user: IUser): Observable<IUser>{
    const url = this.apiUrl + 'update-visibility';
    const body = {
      id: user.id,
      isActive: user.isActive
    };

    return this.http.put<IUser>(url, body);
  }

  updatePermissions(user: IUser): Observable<IUser>{
    const url = this.apiUrl + 'update-permissions';
    const body = {
      id: user.id,
      isAdmin: user.isAdmin
    };

    return this.http.put<IUser>(url, body);
  }


}