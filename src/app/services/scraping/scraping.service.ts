import { Injectable, EventEmitter } from '@angular/core';
import { ScrapService } from '../api/scrap/scrap.service';
import { IRequest } from '../../model/i-request.model';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrapingService {
  dataUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private scrapService: ScrapService,
    private loadingCtrl: LoadingController
  ) {}

  async scrape(info: IRequest[]) {
    const loading = await this.showLoading();
    this.dataUpdated.emit([]);
    const requests: IRequest[] = info;
    for (let index = 0; index < requests.length; index++) {
      const response = await firstValueFrom(
        this.scrapService.getLast10Cars(requests[index])
      );
      this.dataUpdated.emit(response);
    }
    requests.forEach(async (request) => {
      /*this.apiService.getLast10Cars(request)
        .subscribe(response => {
          this.dataUpdated.emit(response);
        });*/
    });
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
}
