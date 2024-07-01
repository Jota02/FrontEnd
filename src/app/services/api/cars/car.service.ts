import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Preferences } from '@capacitor/preferences';

import { Observable } from 'rxjs';

import { ICar } from '../../../model/i-car.model';

import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) { 
    this.apiUrl += "cars/"
  }

  //getAllCars - Get Request - get all car entries
  async getAllCars() {
    const url = this.apiUrl + "get-all";
    const token = (await Preferences.get({ key: environment.session.TOKEN_KEY })).value;
    const headers = { 'Authorization': `Bearer ${token}` }

    return this.http.get(url, {headers});
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