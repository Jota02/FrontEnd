import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IRequest } from '../../../model/i-request.model';
import { IResponse } from '../../../model/i-response.model';
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
  getLast10Cars(reqParams: IRequest): Observable<IResponse[]> {
    const params = new HttpParams()
      .set('km', reqParams.km)
      .set('fromYear', reqParams.fromYear)
      .set('toYear', reqParams.toYear)
      .set('fromPrice', reqParams.fromPrice)
      .set('toPrice', reqParams.toPrice)
      .set('url', reqParams.url);

    const url = this.apiUrl + "last-10-cars";

    return this.http.get<IResponse[]>(url, { params });
  }

  //getById - Get Request - get scrap history entry by id
  getById(id: String): Observable<IScrap[]>  {
    const url = this.apiUrl + `get-id/${id}`;

    return this.http.get<IScrap[]>(url);
  }

  //createScrap - Post Request - create scrap history entry
  createScrap(id: String) {
    const url = this.apiUrl + 'create';
    const body = {cars_id_fk: id};

    return this.http.post<{ id: string }>(url, body);
  }

  //deleteScrap - Delete Request - deletes scrap history entry
  deleteScrap(id: String) {
    const url = this.apiUrl + `delete/${id}`;

    return this.http.delete(url);
  }
}