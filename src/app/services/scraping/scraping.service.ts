import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IRequest } from '../../model/i-request.model';

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {
  dataUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private apiService: ApiService) { }

  scrape(info: IRequest[]) {
    const requests: IRequest[] = info;

    requests.forEach(request => {
      this.apiService.getLast10Cars(request)
        .subscribe(response => {
          this.dataUpdated.emit(response);
        });
    });
  }
}
