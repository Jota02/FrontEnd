import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { IUser } from 'src/app/model/i-user.model';
import { AuthenticationService } from 'src/app/services/api/auth/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  current_year: number = new Date().getFullYear();
  newUser: IUser = {
    id: '', name: '', email: '', password: '',
    isAdmin: false,
    isActive: false
  };

  constructor(
    private userService: AuthenticationService,
    private alertController: AlertController,
    private modalController: ModalController,
    private router: Router
  ) {}
  ngOnInit() { }
  closeModal(message = '') {
    this.modalController.dismiss({ message: message });
  }

  submitAddUserForm() {
    this.userService.signup(this.newUser).subscribe({
      next: () => {
        this.newUser = { id: '', name: '', email: '', password: '', isActive: false, isAdmin: false };
        this.closeModal('confirmed');
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        console.error('Error adding user:', error);
        this.showErrorAlert(error);
      }
    });
  }

  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'There was an error adding the user. Please try again.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
