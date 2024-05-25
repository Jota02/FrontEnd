import { Injectable } from '@angular/core';
import { ScrapService } from '../api/scrap/scrap.service';
import { IRequest } from '../../model/i-request.model';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ICar } from '../../model/i-car.model';
import { IResponse } from '../../model/i-response.model';

@Injectable({
  providedIn: 'root',
})
export class ScrapingService {
  private selectedCarsSubject = new BehaviorSubject<Set<ICar>>(new Set());
  selectedCars$ = this.selectedCarsSubject.asObservable();

  private responsesSubject = new BehaviorSubject<IResponse[]>([]);
  responses$ = this.responsesSubject.asObservable();

  constructor(
    private scrapService: ScrapService,
    private loadingCtrl: LoadingController
  ) {}

  async scrap(requests: IRequest[], scrap_ids: string[]) {
    const loading = await this.showLoading();
    try {
      const responsePromises: Promise<IResponse[]>[] = requests.map(async (request, i) => {
        const scrap_id = scrap_ids[i];
        const responses = await firstValueFrom(this.scrapService.getLast10Cars(request));

        return responses.map(response => {
          return { ...response, scrap_id_fk: scrap_id };
        });
      });

      const responses = await Promise.all(responsePromises);
      const flatResponses = responses.reduce((acc, curr) => acc.concat(curr), []);

      this.responsesSubject.next(flatResponses);

    } catch (error) {
      console.error('Error:', error);
    }

    await loading.dismiss();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Loading Cars...',
    });
    await loading.present();
    return loading;
  }

  updateSelectedCars(selectedCars: Set<ICar>) {
    this.selectedCarsSubject.next(selectedCars);
  }
}
