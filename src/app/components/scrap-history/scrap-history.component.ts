import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { switchMap } from 'rxjs';
import { ScrapService } from '../../services/api/scrap/scrap.service';
import { ResponseService } from '../../services/api/response/response.service';
import { IScrap } from '../../model/i-scrap.model';
import { IResponse } from '../../model/i-response.model';

@Component({
  selector: 'app-scrap-history',
  templateUrl: './scrap-history.component.html',
  styleUrls: ['./scrap-history.component.scss'],
})
export class ScrapHistoryComponent implements OnInit {
  @Input() carId!: String;

  scraps: IScrap[] = [];
  history: Map<String, IResponse[]> = new Map();

  constructor(
    private scrapService: ScrapService,
    private responseService: ResponseService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadHistory(this.carId);
  }

  //loadHistory - Loads Scrap table entries for a specific id
  loadHistory(id: String) {
    this.scrapService.getById(id).subscribe({
      next: (scrap: IScrap[]) => {
        this.scraps = scrap;
        this.loadResponses();
      },
    });
  }

  //loadResponses - Loads Responses table entries for each specified scrap id
  loadResponses() {
    this.scraps.forEach((scrap) => {
      this.responseService.getById(scrap.id).subscribe({
        next: (response: IResponse[]) => {
          this.history.set(scrap.id, response);
        },
      });
    });
  }

  //delete - Deletes Responses and Scrap tables entries for a specific scrap id
  delete(id: String) {
    this.responseService
      .deleteResponses(id)
      .pipe(switchMap(() => this.scrapService.deleteScrap(id)))
      .subscribe({
        next: () => {
          this.closeModal();
          this.showToast();
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  private async showToast() {
    const toast = await this.toastController.create({
      message: 'History successfully deleted!',
      duration: 1000,
      position: 'middle',
      cssClass: 'custom-toast',
    });
    await toast.present();
  }

  //closeModal - Closes modal
  closeModal() {
    this.modalController.dismiss();
  }
}
