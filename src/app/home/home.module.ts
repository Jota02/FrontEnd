import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { ScrapeResultListComponent } from '../components/scrape-result-list/scrape-result-list.component';
import { CarsTableComponent } from '../components/cars-table/cars-table.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage, 
    ScrapeResultListComponent,
    CarsTableComponent
  ]
})
export class HomePageModule {}
