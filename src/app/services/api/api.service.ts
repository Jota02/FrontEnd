import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRequest } from '../../model/i-request.model';
import { IResponse } from '../../model/i-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://localhost:8080/api/scrap/last-10-cars';

  constructor(private http: HttpClient) {}

  getLast10Cars(reqParams: IRequest): Observable<IResponse[]> {
    const params = new HttpParams()
      .set('km', reqParams.km)
      .set('fromYear', reqParams.fromYear)
      .set('toYear', reqParams.toYear)
      .set('fromPrice', reqParams.fromPrice)
      .set('toPrice', reqParams.toPrice)
      .set('url', reqParams.url);

    return this.http.get<IResponse[]>(this.API_URL, { params });
  }
}
