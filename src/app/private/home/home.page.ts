import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { CarService } from '../../services/api/cars/car.service';
import { AuthenticationService } from '../../services/api/auth/authentication.service';

import { AddCarsComponent } from '../../components/add-cars/add-cars.component';

import { ICar } from '../../model/i-car.model';
import { IUser } from 'src/app/model/i-user.model';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  cars: ICar[] = [];
  segmentValue: string = 'Active'; // Default segment value
  isAdmin: boolean = false;

  constructor(
    private toastController: ToastController,
    private carService: CarService,
    public modalController: ModalController,
    private authService  : AuthenticationService,
    private router : Router
  ) {}

  async ngOnInit() {
    const userId = await this.authService.getUserIdFromToken();
    if (userId) {
      const user = await firstValueFrom(this.authService.getUserById(userId));
      this.isAdmin = user?.isAdmin;
    }
  }

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
    const toast = await this.toastController.create({
      message: 'Are you sure you want to leave?',
      position: 'middle',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'YES',
          handler: async () => {
            await this.authService.logout();
            await this.router.navigateByUrl('/', { replaceUrl: true });
          }
        }
      ],
      cssClass: 'custom-toast'
    });

    await toast.present();
  }

  Users(){
    this.router.navigateByUrl('/user-control');
  }
}
