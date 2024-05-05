import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Info } from '../utils/info.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private API_URL = "http://localhost:8080/api/last-10-cars";

  constructor(private http: HttpClient) { }

  getLast10Cars(info: Info): Observable<any> {
    const params = new HttpParams()
      .set('km', info.km)
      .set('fromYear', info.fromYear)
      .set('toYear', info.toYear)
      .set('fromPrice', info.fromPrice)
      .set('toPrice', info.toPrice)
      .set('url', info.url);

    return this.http.get(this.API_URL, { params })
  }

}
