import { Component, OnInit } from '@angular/core';
import { ScrapingService } from '../../services/scraping/scraping.service';
import { IResponse } from '../../model/i-response.model';

@Component({
  selector: 'app-scrape-result-list',
  templateUrl: './scrape-result-list.component.html',
  styleUrls: ['./scrape-result-list.component.scss'],
})
export class ScrapeResultListComponent implements OnInit {
  responses: IResponse[] = [];

  constructor(private scrapingService: ScrapingService) {}

  ngOnInit(){
    this.scrapingService.responses$.subscribe(responses => {
      this.responses = responses;
    })
  }
}
