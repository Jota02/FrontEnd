import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../../../model/i-response.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {

  private apiUrl = "http://localhost:8080/api/responses/";

  constructor(private http: HttpClient) { }

  getById(id: String): Observable<IResponse[]>  {
    const url = this.apiUrl + `get-id/${id}`;

    return this.http.get<IResponse[]>(url);
  }

  createScrap(responses: IResponse[]){
    const url = this.apiUrl + 'create';
    const body = responses.map(response => {
      return {
        model_make: response.modelMake,
        km: response.km,
        year: response.year,
        price: response.price,
        url: response.url,
        scrap_id_fk: response.scrapIdFk
      };
    });

    return this.http.post(url, body);
  }
}