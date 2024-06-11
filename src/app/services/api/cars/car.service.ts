import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ICar } from '../../../model/i-car.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = "http://localhost:8080/api/cars/";
  

  constructor(private http: HttpClient) { }

  //getAllCars - Get Request - get all car entries
  getAllCars(): Observable<ICar[]> {
    const url = this.apiUrl + "get-all";

    return this.http.get<ICar[]>(url);
  }

  //createCar - Post Request - create car entry
  createCar(car: ICar): Observable<ICar>{
    const url = this.apiUrl + 'create';
    const body = {
      make: car.make,
      model: car.model,
      url: car.url
    };

    return this.http.post<ICar>(url, body);
  }

  //updateCar - Put Request - update car info for one car
  updateCar(car: ICar): Observable<ICar>{
    const url = this.apiUrl + 'update';
    const body = {
      id: car.id,
      make: car.make,
      model: car.model,
      url: car.url,
      active: car.active
    };

    return this.http.put<ICar>(url, body);
  }
}