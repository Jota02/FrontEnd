import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICar } from '../../../model/i-car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = "http://localhost:8080/api/cars/";

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<ICar[]> {
    const url = this.apiUrl + "get-all";

    return this.http.get<ICar[]>(url);
  }

  createCar(car: ICar){
    const url = this.apiUrl + 'create';
    const body = {
      make: car.make,
      model: car.model,
      url: car.url
    };

    return this.http.post(url, body);
  }

  updateCar(car: ICar){
    const url = this.apiUrl + 'update';
    const body = {
      make: car.make,
      model: car.model,
      url: car.url
    };

    return this.http.put(url, body);
  }
}