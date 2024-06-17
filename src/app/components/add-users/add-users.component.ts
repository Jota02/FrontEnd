import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { IUser } from '../../model/i-user.model'; // Importe o modelo de usuário apropriado
import { AuthenticationService } from 'src/app/services/api/auth/authentication.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {
  newUser: IUser = {
    id: '', name: '', email: '', password: '',
    isAdmin: false,
    isActive: false
  };

  constructor(
    private userService: AuthenticationService, // Injete o serviço de usuário apropriado
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  // Função para fechar o modal
  closeModal(message = '') {
    this.modalController.dismiss({ message: message });
  }

  // Função para enviar o formulário de adição de usuário
  submitAddUserForm() {
    this.userService.signup(this.newUser).subscribe({
      next: () => {
        this.newUser = { id: '', name: '', email: '', password: '', isActive: false, isAdmin: false };
        this.closeModal('confirmed');
      },
      error: (error) => {
        console.error('Error adding user:', error);
        this.showErrorAlert(error);
      }
    });
  }

  // Função para exibir um alerta de erro
  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'There was an error adding the user. Please try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
