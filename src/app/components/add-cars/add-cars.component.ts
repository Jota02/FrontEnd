import { Component } from '@angular/core';
import { ICar } from '../../model/i-car.model';
import { CarService } from '../../services/api/cars/car.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent {
  newCar: ICar = { id: '', make: '', model: '', url: '', active: true };

  constructor(private carService: CarService, private alertController: AlertController, private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss()
  }

  submitAddCarForm() {
    this.carService.createCar(this.newCar).subscribe({
      next: () => {
        this.newCar = { id: '', make: '', model: '', url: '', active: true };
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
