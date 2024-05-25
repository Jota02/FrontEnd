import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../../model/i-response.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private apiUrl = "http://localhost:8080/api/responses/";

  constructor(private http: HttpClient) { }

  getById(id: String): Observable<IResponse[]>  {
    const url = this.apiUrl + `get-id/${id}`;

    return this.http.get<IResponse[]>(url);
  }

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

  deleteResponses(id: String) {
    const url = this.apiUrl + `delete/${id}`;

    return this.http.delete(url);
  }
}