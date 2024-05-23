import { Component, OnInit, Input } from '@angular/core';
import {ScrapService} from '../../services/api/scrap/scrap.service';
import { ResponsesService } from 'src/app/services/api/response/response.service';
import { IScrap } from '../../model/i-scrap.model';
import { IResponse } from '../../model/i-response.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scrap-history',
  templateUrl: './scrap-history.component.html',
  styleUrls: ['./scrap-history.component.scss'],
})
export class ScrapHistoryComponent  implements OnInit {
  @Input() carId!: String;
  scraps: IScrap[] = [];
  history: Map<String, IResponse[]> = new Map;

  constructor(private scrapService: ScrapService, private responseService: ResponsesService,  private modalController: ModalController) { }

  ngOnInit() {
    this.loadHistory(this.carId);
  }

  loadHistory(id: String) {
    this.scrapService.getById(id).subscribe({
      next: (scrap: IScrap[]) => {
        this.scraps = scrap;
        this.loadResponses();
      }
    });
  }

  loadResponses() {
    this.scraps.forEach(scrap => {
      this.responseService.getById(scrap.id).subscribe({
        next: (response: IResponse[]) => {
          this.history.set(scrap.id, response);
        }
      });
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
