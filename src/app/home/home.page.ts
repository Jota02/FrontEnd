import { Component, ViewChild } from '@angular/core';
import { ScrapingService } from '../services/scraping/scraping.service';
import { CarService } from '../services/api/cars/car.service';
import { IRequest } from '../model/i-request.model';
import { IResponse } from '../model/i-response.model';
import { ICar } from '../model/i-car.model';
import { ModalController, IonModal } from '@ionic/angular';
import { AddCarsComponent } from '../components/add-cars/add-cars.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  rows: any[] = [{ selected: false, showContent: true }];
  editingIndex: number | null = null;
  public finalData: IResponse[] = [];
  @ViewChild(IonModal)
  modal!: IonModal;
  modalOpenIndex: number | undefined;
  contentVisible: boolean = true;

  cars: ICar[] = [];

  constructor(
    private scrapingService: ScrapingService,
    private carService: CarService,
    public modalController: ModalController
  ) {
    const storedRows = localStorage.getItem('rows');
    this.rows = storedRows ? JSON.parse(storedRows) : [{}];
  }

  getCars() {
    this.carService.getAllCars().subscribe((cars: ICar[]) => {
      this.cars = cars;
    });
  }

  async openAddCarModal() {
    const modal = await this.modalController.create({
      component: AddCarsComponent
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (data?.message === 'confirmed') {
      this.getCars();
    }
    
  }

  openModal(index: number) {
    this.modalOpenIndex = index;
  }

  toggleSelected(row: any) {
    row.selected = !row.selected;
    localStorage.setItem('rows', JSON.stringify(this.rows));
    console.log(row.model, row.selected);
  }

  getInputValue(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    const value = input ? input.value : 'null';

    return value;
  }

  gatherInfo() {
    const info: IRequest[] = [];
    const urls = this.rows.filter((row) => row.selected);

    const filters = new Map<string, string>();

    filters.set('km', this.getInputValue('km'));
    filters.set('fromYear', this.getInputValue('fromYear'));
    filters.set('toYear', this.getInputValue('toYear'));
    filters.set('fromPrice', this.getInputValue('fromPrice'));
    filters.set('toPrice', this.getInputValue('toPrice'));

    urls.forEach((url) => {
      let data: IRequest = {
        km: filters.get('km') ?? 'null',
        fromYear: filters.get('fromYear') ?? 'null',
        toYear: filters.get('toYear') ?? 'null',
        fromPrice: filters.get('fromPrice') ?? 'null',
        toPrice: filters.get('toPrice') ?? 'null',
        url: url.link,
      };

      info.push(data);
    });

    return info;
  }
}
