import { Component, OnInit } from '@angular/core';
import { ScrapingService } from 'src/app/services/scraping.service';
import { IResponse } from 'src/app/model/i-response.model';


@Component({
  selector: 'app-scrape-result-list',
  templateUrl: './scrape-result-list.component.html',
  styleUrls: ['./scrape-result-list.component.scss'],
})
export class ScrapeResultListComponent  implements OnInit {

  rows: any[] = [];
  
  constructor(private scrapingService: ScrapingService) { }

  ngOnInit(): void {
    this.scrapingService.dataUpdated.subscribe(response => {
      response.forEach((res: IResponse[]) => {
        this.rows.push(res);
      });
    });
  }

}

