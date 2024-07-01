import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { CarService } from '../../services/api/cars/car.service';
import { AuthenticationService } from '../../services/api/auth/authentication.service';
import { UsersService } from '../../services/api/users/users.service';

import { AddCarsComponent } from '../../components/add-cars/add-cars.component';

import { ICar } from '../../model/i-car.model';
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
  current_year: number = new Date().getFullYear();

  constructor(
    private toastController: ToastController,
    public modalController: ModalController,
    private carService: CarService,
    private authService  : AuthenticationService,
    private usersService : UsersService,
    private router : Router
  ) {}

  async ngOnInit() {
    const userId = await this.authService.getUserIdFromToken();
    if (userId) {
      const user = await firstValueFrom<any>(await this.usersService.getUserById(userId));
      this.isAdmin = user?.isAdmin;
    }
  }

  async getCars() {
    this.cars = await firstValueFrom<any>(await this.carService.getAllCars());
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
