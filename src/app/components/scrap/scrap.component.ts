import { Component, OnInit } from '@angular/core';
import { IRequest } from '../../model/i-request.model';
import { ICar } from '../../model/i-car.model'
import { ScrapingService } from '../../services/scraping/scraping.service';
import { ScrapService } from '../../services/api/scrap/scrap.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss'],
})
export class ScrapComponent {
  selectedCars: Set<ICar> = new Set();

  constructor(private scrapingService: ScrapingService, private apiScrapService: ScrapService) { 
    this.scrapingService.selectedCars$.subscribe(selectedCars => {
      this.selectedCars = selectedCars;
    });
  }

  getInputValue(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    const value = input ? input.value : 'null';

    return value;
  }

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

  createScrapHistory(): Promise<string[]> {
    const createScrapPromises = Array.from(this.selectedCars).map(async car => {
      const res = await firstValueFrom(this.apiScrapService.createScrap(car.id));
      return res.id;
    });
  
    return Promise.all(createScrapPromises);
  }

  async scrap() {
    const scrap_ids = await this.createScrapHistory();
    await this.scrapingService.scrap(this.gatherInfo(), scrap_ids);
  }

}
