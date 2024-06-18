import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserControlPageRoutingModule } from './user-control-routing.module';

import { UserControlPage } from './user-control.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserControlPageRoutingModule
  ],
  declarations: [UserControlPage]
})
export class UserControlPageModule {}
