import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Preferences } from '@capacitor/preferences';

import { environment } from '../../../../environments/environment';

import { IUser } from '../../../model/i-user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.api_url;


  constructor(private http: HttpClient) {
    this.apiUrl += "users/"
   }

  async getAllUsers(){
    const url = this.apiUrl + "get-all";
    
    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.get(url, {headers});
  }

  async getUserById(id: String) {
    const url = this.apiUrl + `get-user/${id}`;

    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.get(url, {headers});
  }

  async updateVisibility(user: IUser){
    const url = this.apiUrl + 'update-visibility';
    const body = {
      id: user.id,
      isActive: user.isActive
    };

    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.put(url, body, {headers});
  }

  async updatePermissions(user: IUser){
    const url = this.apiUrl + 'update-permissions';
    const body = {
      id: user.id,
      isAdmin: user.isAdmin
    };

    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }


    return this.http.put(url, body, {headers});
  }
}
