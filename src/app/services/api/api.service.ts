import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRequest } from '../../model/i-request.model';
import { IResponse } from '../../model/i-response.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) {
    this.apiUrl += "scrap/last-10-cars"
  }

  getLast10Cars(reqParams: IRequest): Observable<IResponse[]> {
    const params = new HttpParams()
      .set('km', reqParams.km)
      .set('fromYear', reqParams.fromYear)
      .set('toYear', reqParams.toYear)
      .set('fromPrice', reqParams.fromPrice)
      .set('toPrice', reqParams.toPrice)
      .set('url', reqParams.url);

    return this.http.get<IResponse[]>(this.apiUrl, { params });
  }
}
