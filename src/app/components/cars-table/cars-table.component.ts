import { Component, Input } from '@angular/core';
import { ICar } from '../../model/i-car.model'
import { ModalController } from '@ionic/angular';
import { EditCarComponent } from '../edit-car/edit-car.component';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss']
})
export class CarsTableComponent {
  @Input() cars: ICar[] = [];
  editingIndex: number | null = null;

  constructor(private modalController: ModalController) {}

  //Edit a row
  toggleEdit(index: number) {
    if (this.editingIndex === index) {
      this.editingIndex = null;
    } else {
      this.editingIndex = index;
    }
  }

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
  deactivateCar(index: number) {
    this.cars[index].active = false;
  }

  //Open history modal
  openModal(index: number) {
    console.log('Open')
  }



}
