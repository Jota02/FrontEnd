import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRequest } from '../../../model/i-request.model';
import { IResponse } from '../../../model/i-response.model';
import { IScrap } from '../../../model/i-scrap.model';

@Injectable({
  providedIn: 'root'
})
export class ScrapService {
  private apiUrl = "http://localhost:8080/api/scrap/";

  constructor(private http: HttpClient) { }

  //Get 10 recent cars
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

  //Get scrap history by id
  getById(id: String): Observable<IScrap[]>  {
    const url = this.apiUrl + `get-id/${id}`;

    return this.http.get<IScrap[]>(url);
  }

  //Create scrap history entry
  createScrap(id: String) {
    const url = this.apiUrl + 'create';
    const body = {cars_id_fk: id};

    return this.http.post<{ id: string }>(url, body);
  }
}