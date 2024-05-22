import { Component, Input } from '@angular/core';
import { ICar } from '../../model/i-car.model';
import { CarService } from '../../services/api/cars/car.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss'],
})
export class EditCarComponent {
  @Input() car!: ICar;

  constructor(private carService: CarService, private alertController: AlertController, private modalController: ModalController) { }

  closeModal() {
    this.modalController.dismiss();
  }

  submitEditCarForm() {
    this.carService.updateCar(this.car).subscribe({
      next: () => {
        this.closeModal();
      },
      error: (error) => {
        console.error('Error adding car:', error);
        this.showErrorAlert(error);
      }
    });
  }

  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'There was an error adding the car. Please try again.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
