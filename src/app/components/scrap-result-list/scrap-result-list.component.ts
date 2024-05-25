import { Component, OnInit } from '@angular/core';

import { ScrapingService } from '../../services/scraping/scraping.service';

import { IResponse } from '../../model/i-response.model';


@Component({
  selector: 'app-scrap-result-list',
  templateUrl: './scrap-result-list.component.html',
  styleUrls: ['./scrap-result-list.component.scss'],
})
export class ScrapResultListComponent implements OnInit {
  responses: IResponse[] = [];

  constructor(private scrapingService: ScrapingService) {}

  ngOnInit(){
    this.scrapingService.responses$.subscribe(responses => {
      this.responses = responses;
    });
  }
}
