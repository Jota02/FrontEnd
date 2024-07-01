import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Preferences } from '@capacitor/preferences';

import { Observable } from 'rxjs';

import { IRequest } from '../../../model/i-request.model';
import { IScrap } from '../../../model/i-scrap.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScrapService {
  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) { 
    this.apiUrl += "scrap/"
  }

  //getLast10Cars - Get Request - get last 10 cars posted
  async getLast10Cars(reqParams: IRequest) {
    const params = new HttpParams()
      .set('km', reqParams.km)
      .set('fromYear', reqParams.fromYear)
      .set('toYear', reqParams.toYear)
      .set('fromPrice', reqParams.fromPrice)
      .set('toPrice', reqParams.toPrice)
      .set('url', reqParams.url);

    const url = this.apiUrl + "last-10-cars";

    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.get(url, { params, headers });
  }

  //getById - Get Request - get scrap history entry by id
  async getById(id: String)  {
    const url = this.apiUrl + `get-id/${id}`;

    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.get(url, { headers });
  }

  //createScrap - Post Request - create scrap history entry
  async createScrap(id: String) {
    const url = this.apiUrl + 'create';
    const body = {cars_id_fk: id};

    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }


    return this.http.post(url, body, { headers });
  }

  //deleteScrap - Delete Request - deletes scrap history entry
  async deleteScrap(id: String) {
    const url = this.apiUrl + `delete/${id}`;

    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.delete(url, { headers });
  }
}