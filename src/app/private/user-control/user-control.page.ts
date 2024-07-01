import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';

import { UsersService } from '../../services/api/users/users.service';
import { AddUsersComponent } from '../../components/add-users/add-users.component';
import { IUser } from '../../model/i-user.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.page.html',
  styleUrls: ['./user-control.page.scss'],
})
export class UserControlPage implements OnInit {
  users: IUser[] = [];
  current_year: number = new Date().getFullYear();

  constructor(
    private usersService: UsersService,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    this.users = await firstValueFrom<any>(await this.usersService.getAllUsers());
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'middle',
    });
    await toast.present();
  }

  async openAddUserModal() {
    const modal = await this.modalController.create({
      component: AddUsersComponent,
    });

    modal.onWillDismiss().then((result) => {
      if (result.data?.message === 'confirmed') {
        this.getUsers();
        this.presentToast('User added successfully!');
      }
    });

    return await modal.present();
  }

  async toggleAdmin(user: IUser, event: any) {
    user.isAdmin = event.detail.checked;
    firstValueFrom<any>(await this.usersService.updatePermissions(user));
    this.presentToast(`${user.name} is now ${user.isAdmin ? 'an Admin' : 'not an Admin'}`);
  }

  async toggleActive(user: IUser, event: any) {
    user.isActive = event.detail.checked;
    firstValueFrom<any>(await this.usersService.updateVisibility(user));
    this.presentToast(`${user.name} is now ${user.isActive ? 'Active' : 'Inactive'}`);
  }

}
