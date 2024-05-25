import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { ICar } from '../../model/i-car.model';

import { CarService } from '../../services/api/cars/car.service';


@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
})
export class EditCarComponent {
  @Input() car!: ICar;

  constructor(
    private carService: CarService, 
    private alertController: AlertController, 
    private modalController: ModalController
  ) { }

  //closeModal - Closes modal upon specific msg
  closeModal(message = '') {
    this.modalController.dismiss({message: message});
  }

  //submitEditCarForm - Calls put request to update specific car
  submitEditCarForm() {
    this.carService.updateCar(this.car).subscribe({
      next: () => {
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
