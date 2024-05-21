import { Component } from '@angular/core';
import { ICar } from '../../model/i-car.model';
import { CarService } from '../../services/api/cars/car.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent {
  isModalOpen = false;
  newCar: ICar = { id: '', make: '', model: '', url: '', active: true };

  constructor(private carService: CarService, private alertController: AlertController) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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
