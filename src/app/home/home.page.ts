import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CarService } from '../services/api/cars/car.service';

import { AddCarsComponent } from '../components/add-cars/add-cars.component';

import { ICar } from '../model/i-car.model';
import { AuthenticationService } from '../services/api/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cars: ICar[] = [];
  segmentValue: string = 'Active'; // Default segment value

  constructor(
    private carService: CarService,
    public modalController: ModalController,
    private authService  : AuthenticationService,
    private router : Router
  ) {}

  getCars() {
    this.carService.getAllCars().subscribe((cars: ICar[]) => {
      this.cars = cars;
    });
  }

  async openAddCarModal() {
    const modal = await this.modalController.create({
      component: AddCarsComponent,
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (data?.message === 'confirmed') {
      this.getCars();
    }
  }

  segmentChanged(event: any) {
    this.segmentValue = event.detail.value; // Update the segment value
  }

  async logOut() {
    //TODO ASK LOGOUT
    await this.authService.logout();
    await this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
