import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { AuthenticationService } from '../../services/api/auth/authentication.service';

import { IUser } from '../../model/i-user.model';

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.page.html',
  styleUrls: ['./user-control.page.scss'],
})
export class UserControlPage implements OnInit {
  users: IUser[] = [];

  constructor(
    private authService: AuthenticationService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers(){
    this.authService.getAllUsers().subscribe((users: IUser[]) => {
        this.users = users;
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  toggleAdmin(user: IUser, event: any) {
    user.isAdmin = event.detail.checked;
    this.presentToast(`${user.name} is now ${user.isAdmin ? 'an Admin' : 'not an Admin'}`);
  }

  toggleActive(user: IUser, event: any) {
    user.isActive = event.detail.checked;
    this.presentToast(`${user.name} is now ${user.isActive ? 'Active' : 'Inactive'}`);
  }


}
