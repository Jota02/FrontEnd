import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastController } from '@ionic/angular';

import { firstValueFrom } from 'rxjs';

import { ScrapingService } from '../../services/scraping/scraping.service';
import { ScrapService } from '../../services/api/scrap/scrap.service';
import { ResponseService } from '../../services/api/response/response.service';

import { IRequest } from '../../model/i-request.model';
import { ICar } from '../../model/i-car.model'
import { IResponse } from '../../model/i-response.model';
import { IScrap } from '../../model/i-scrap.model';


@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss'],
  providers: [DatePipe]
})
export class ScrapComponent {
  selectedCars: Set<ICar> = new Set();
  responses: IResponse[] = [];
  scrapDate: Date | null = null;

  constructor(
    private scrapingService: ScrapingService,
    private apiScrapService: ScrapService,
    private responseService: ResponseService,
    private datePipe: DatePipe,
    private toastController: ToastController
  ) 
  { 
    this.scrapingService.selectedCars$.subscribe(selectedCars => {
      this.selectedCars = selectedCars;
    });
    this.scrapingService.responses$.subscribe(responses => {
      this.responses = responses;
    });
  }

  //getInputValue - Gets the value from each input for a specific id
  getInputValue(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    const value = input ? input.value : 'null';

    return value;
  }

  //gatherInfo - Combines filters input with selectedCars to build requests
  gatherInfo() {
    const requests: IRequest[] = [];
    const selectedCars = this.selectedCars;
    const filters = new Map<string, string>();

    filters.set('km', this.getInputValue('km'));
    filters.set('fromYear', this.getInputValue('fromYear'));
    filters.set('toYear', this.getInputValue('toYear'));
    filters.set('fromPrice', this.getInputValue('fromPrice'));
    filters.set('toPrice', this.getInputValue('toPrice'));

    selectedCars.forEach((car) => {
      let request: IRequest = {
        km: filters.get('km') ?? 'null',
        fromYear: filters.get('fromYear') ?? 'null',
        toYear: filters.get('toYear') ?? 'null',
        fromPrice: filters.get('fromPrice') ?? 'null',
        toPrice: filters.get('toPrice') ?? 'null',
        url: car.url,
      };

      requests.push(request);
    });

    return requests;
  }

  //createScrapHistory - Calls post request for scraps for each selected car and returns all scraps ids generated
  createScrapHistory(): Promise<IScrap[]> {
    const createScrapPromises = Array.from(this.selectedCars).map(async car => {
      const res = await firstValueFrom(this.apiScrapService.createScrap(car.id));
      return res;
    });
  
    return Promise.all(createScrapPromises);
  }

  //scrap -  Passes requests and scrap ids to scrap function / Calls post request for each response received
  async scrap() {
    if (this.selectedCars.size === 0) {
      this.presentToast('Please select cars to scrap!');
      return;
    }

    const scrapHistory = await this.createScrapHistory();
    const scrap_ids = scrapHistory.map(scrap => scrap.id);

    this.scrapDate = scrapHistory[0].date_hour;
  
    await this.scrapingService.scrap(this.gatherInfo(), scrap_ids);
    this.responseService.createResponses(this.responses).subscribe();
  }

  formatDateForFilename(date: Date): string {
    return this.datePipe.transform(date, 'ddMMyyyy_HHmm') + '_responses.csv';
  }

  //exportResponses - Exports responses to CSV
  exportResponses() {
    if (this.responses.length === 0) {
      this.presentToast('Please scrap cars before exporting!');
      return;
    }

    if(this.scrapDate){
      const filename = this.formatDateForFilename(this.scrapDate);
      const csvData = this.convertToCSV(this.responses);
      this.downloadCSV(csvData, filename);
    }
    
  }

  //convertToCSV - Converts responses to CSV format
  convertToCSV(responses: IResponse[]): string {
    const header = 'model_make,km,year,price,url,published_date\n';
    const rows = responses.map(response => {
      const publishedDate = this.datePipe.transform(response.published_date, 'dd/MM/yyyy HH:mm');
      return `${response.model_make},${response.km},${response.year},${response.price},${response.url},${publishedDate}`
    }).join('\n');

    return header + rows;
  }

  //downloadCSV - Trigger CSV download
  downloadCSV(csvData: string, filename: string) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'middle'
    });
    toast.present();
  }

}
