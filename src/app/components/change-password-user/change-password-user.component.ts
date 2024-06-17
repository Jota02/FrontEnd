import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/api/auth/authentication.service';
import { IUser } from 'src/app/model/i-user.model';

@Component({
  selector: 'app-change-password-user',
  templateUrl: './change-password-user.component.html',
  styleUrls: ['./change-password-user.component.scss'],
})
export class ChangePasswordUserComponent {

  user: IUser = {
    id: '', 
    name: '', 
    email: '', 
    password: '',
    isAdmin: false,
    isActive: false
  };
  newPassword: string = '';

  constructor(
    private userService: AuthenticationService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  closeModal(message = '') {
    this.modalController.dismiss({ message: message });
  }

  submitChangeUserPasswordForm() {
    if (!this.user.email || !this.user.password || !this.newPassword) {
      this.showErrorAlert('Please fill in all fields.');
      return;
    }

    this.userService.changePassword(this.user, this.newPassword).subscribe({
      next: () => {
        this.user.password = this.newPassword;
        this.closeModal('confirmed');
      },
      error: (error) => {
        console.error('Error changing password:', error);
        this.showErrorAlert('Failed to change password. Please try again.');
      }
    });
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
