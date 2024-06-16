import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserControlPage } from './user-control.page';

const routes: Routes = [
  {
    path: '',
    component: UserControlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserControlPageRoutingModule {}
