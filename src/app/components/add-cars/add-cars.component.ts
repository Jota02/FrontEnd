import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { CarService } from '../../services/api/cars/car.service';

import { ICar } from '../../model/i-car.model';


@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent {
  newCar: ICar = { id: '', make: '', model: '', url: '', active: true };

  constructor(
    private carService: CarService, 
    private alertController: AlertController, 
    private modalController: ModalController
  ) {}

  //closeModal - Closes modal upon specific msg
  closeModal(message = '') {
    this.modalController.dismiss({message: message});
  }

  //submitAddCarForm - Calls post request to create specific car
  submitAddCarForm() {
    this.carService.createCar(this.newCar).subscribe({
      next: () => {
        this.newCar = { id: '', make: '', model: '', url: '', active: true };
        this.closeModal('confirmed');
      },
      error: (error) => {
        console.error('Error adding car:', error);
        this.showErrorAlert(error);
      }
    });
  }

  //showErrorAlert - Error pop up when request returns an error
  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'There was an error adding the car. Please try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
