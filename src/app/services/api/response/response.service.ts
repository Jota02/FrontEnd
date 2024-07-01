import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Preferences } from '@capacitor/preferences';

import { IResponse } from '../../../model/i-response.model';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) {
    this.apiUrl += "responses/"
   }

  //getById - Get Request - get responses by scrap id
  async getById(id: String) {
    const url = this.apiUrl + `get-id/${id}`;

    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.get(url, { headers });
  }

  //createResponses - Post Request - create responses
  async createResponses(responses: IResponse[]) {
    const url = this.apiUrl + 'create';
    const body = responses.map(response => {
      return {
        model_make: response.model_make,
        km: response.km,
        year: response.year,
        price: response.price,
        url: response.url,
        published_date: response.published_date,
        scrap_id_fk: response.scrap_id_fk
      };
    });

    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.post(url, body, { headers });
  }

  //deleteResponses - Delete Request - delete responses by scrap id
  async deleteResponses(id: String) {
    const url = this.apiUrl + `delete/${id}`;

    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.delete(url, { headers });
  }
}