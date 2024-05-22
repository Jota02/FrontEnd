import { Component, Input } from '@angular/core';
import { ICar } from '../../model/i-car.model'
import { ModalController } from '@ionic/angular';
import { EditCarComponent } from '../edit-car/edit-car.component';
import { CarService } from 'src/app/services/api/cars/car.service';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss']
})
export class CarsTableComponent {
  @Input() cars: ICar[] = [];
  editingIndex: number | null = null;

  constructor(private modalController: ModalController, private carService: CarService) {}

  //Open Edit Modal
  async openEditCarModal(car: ICar) {
    const modal = await this.modalController.create({
      component: EditCarComponent,
      componentProps: {
        car: car
      }
    });
    await modal.present();
  }

  //Set active car to false
  deactivateCar(car: ICar) {
    car.active = false;
    this.carService.updateCar(car).subscribe();
  }

  //Open history modal
  openModal(index: number) {
    console.log('Open')
  }



}
