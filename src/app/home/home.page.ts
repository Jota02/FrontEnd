import { Component, ViewChild } from '@angular/core';
import { ScrapingService } from '../services/scraping/scraping.service';
import { IRequest } from '../model/i-request.model';
import { IResponse } from '../model/i-response.model';
import { LoadingController, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  rows: any[] = [{ selected: false }];
  editingIndex: number | null = null;
  public finalData: IResponse[] = [];
  @ViewChild(IonModal)
  modal!: IonModal;
  modalOpenIndex: number | undefined;

  constructor(
    private scrapingService: ScrapingService,
    private loadingCtrl: LoadingController,
    public modalController: ModalController
  ) {
    const storedRows = localStorage.getItem('rows');
    this.rows = storedRows ? JSON.parse(storedRows) : [{}];
  }

  openModal(index: number) {
    this.modalOpenIndex = index;
  }

  add() {
    this.rows.push({ selected: false });
    localStorage.setItem('rows', JSON.stringify(this.rows));
  }
  edit(index: number) {
    console.log('Editar clicado para a linha', index);
    if (this.editingIndex === null) {
      this.editingIndex = index;
    } else {
      // Save changes
      this.editingIndex = null;
      localStorage.setItem('rows', JSON.stringify(this.rows));
    }
  }

  delete(index: number) {
    console.log('Eliminar clicado', index);
    this.rows.splice(index, 1);
    localStorage.setItem('rows', JSON.stringify(this.rows));
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

  scrape() {
    this.showLoading();
    this.scrapingService.scrape(this.gatherInfo());
    this.loadingCtrl.dismiss();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Loading Cars...',
      duration: 1000,
    });
    await loading.present();
  }
}
