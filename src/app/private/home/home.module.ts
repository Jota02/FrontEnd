import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { ScrapResultListComponent } from '../../components/scrap-result-list/scrap-result-list.component';
import { CarsTableComponent } from '../../components/cars-table/cars-table.component';
import { AddCarsComponent } from '../../components/add-cars/add-cars.component';
import { EditCarComponent } from '../../components/edit-car/edit-car.component';
import { ScrapHistoryComponent } from '../../components/scrap-history/scrap-history.component' 
import { ScrapComponent } from '../../components/scrap/scrap.component';
import { AddUsersComponent } from '../../components/add-users/add-users.component';
import { ChangePasswordUserComponent } from '../../components/change-password-user/change-password-user.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage, 
    ScrapResultListComponent,
    CarsTableComponent,
    AddCarsComponent,
    EditCarComponent,
    ScrapHistoryComponent,
    ScrapComponent,
    AddUsersComponent,
    ChangePasswordUserComponent
  ]
})
export class HomePageModule {}
