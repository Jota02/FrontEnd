import { Component, OnInit } from '@angular/core';
import { ICar } from '../../model/i-car.model'
import { ModalController } from '@ionic/angular';
import { EditCarComponent } from '../edit-car/edit-car.component';
import { ScrapHistoryComponent } from '../scrap-history/scrap-history.component'
import { CarService } from 'src/app/services/api/cars/car.service';
import { ScrapingService } from 'src/app/services/scraping/scraping.service';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss']
})
export class CarsTableComponent implements OnInit {
  cars: ICar[] = [];
  selectedCars: Set<ICar> = new Set<ICar>();
  

  constructor(
    private modalController: ModalController, 
    private carService: CarService, 
    private scrapingService: ScrapingService
  ) {}

  ngOnInit() {
      this.getCars();
  }

  //Open Edit Modal
  async openEditCarModal(car: ICar) {
    const modal = await this.modalController.create({
      component: EditCarComponent,
      componentProps: {
        car: car
      }
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (data?.message === 'confirmed') {
      this.getCars();
    }
  }

  //Load all cars to cars var
  getCars() {
    this.carService.getAllCars().subscribe((cars: ICar[]) => {
      this.cars = cars;
    });
  }

  //Set active car to false
  deactivateCar(car: ICar) {
    car.active = false;
    this.carService.updateCar(car).subscribe();
  }

  //Open history modal
  async openScrapHistoryModal(id: String) {
    const modal = await this.modalController.create({
      component: ScrapHistoryComponent,
      componentProps: {
        carId: id
      }
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

}
