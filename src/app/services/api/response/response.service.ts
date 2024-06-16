import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

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
  getById(id: String): Observable<IResponse[]>  {
    const url = this.apiUrl + `get-id/${id}`;

    return this.http.get<IResponse[]>(url);
  }

  //createResponses - Post Request - create responses
  createResponses(responses: IResponse[]) {
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

    return this.http.post(url, body);
  }

  //deleteResponses - Delete Request - delete responses by scrap id
  deleteResponses(id: String) {
    const url = this.apiUrl + `delete/${id}`;

    return this.http.delete(url);
  }
}