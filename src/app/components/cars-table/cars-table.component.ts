import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { CarService } from '../../services/api/cars/car.service';
import { ScrapingService } from '../../services/scraping/scraping.service';

import { EditCarComponent } from '../edit-car/edit-car.component';
import { ScrapHistoryComponent } from '../scrap-history/scrap-history.component';

import { ICar } from '../../model/i-car.model';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss'],
})
export class CarsTableComponent implements OnInit, OnChanges {
  @Input() filter: string | undefined; // Add Input property for filter
  cars: ICar[] = [];
  selectedCars: Set<ICar> = new Set<ICar>();
  filteredCars: ICar[] = [];

  constructor(
    private modalController: ModalController,
    private carService: CarService,
    private scrapingService: ScrapingService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getCars();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter']) {
      this.applyFilter();
    }
  }

  //openEditCarModal - Calls edit-car component / reloads cars table on modal dismiss
  async openEditCarModal(car: ICar) {
    const modal = await this.modalController.create({
      component: EditCarComponent,
      componentProps: {
        car: car,
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (data?.message === 'confirmed') {
      this.getCars();
    }
  }

  //getCars - Load all cars to cars array
  getCars() {
    this.carService.getAllCars().subscribe((cars: ICar[]) => {
      this.cars = cars;
      this.applyFilter();
    });
  }

  //deactivateCar - Calls Put request to set car active field to false
  deactivateCar(car: ICar) {
    car.active = !car.active;
    this.carService.updateCar(car).subscribe(() => {
      this.applyFilter();
    });
  }

  //openEditCarModal - Calls scrap-history component
  async openScrapHistoryModal(id: String) {
    const modal = await this.modalController.create({
      component: ScrapHistoryComponent,
      componentProps: {
        carId: id,
      },
    });
    await modal.present();
  }

  //Car selection
  toggleSelected(car: ICar, event: any) {
    if (event.detail.checked) {
      this.selectedCars.add(car);
    } else {
      this.selectedCars.delete(car);
    }

    this.scrapingService.updateSelectedCars(this.selectedCars);
  }

  applyFilter() {
    if (this.filter === 'Active') {
      this.filteredCars = this.cars.filter((car) => car.active);
      this.showToast('Car successfully deactivated!');
    } else if (this.filter === 'NonActive') {
      this.filteredCars = this.cars.filter((car) => !car.active);
      this.showToast('Car successfully activated!');
    } else {
      this.filteredCars = this.cars;
    }
  }

  private async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: 'middle',
      cssClass: '     ',
    });
    await toast.present();
  }
}
