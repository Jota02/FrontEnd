import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '../../services/api/auth/authentication.service';
import { IUser } from '../../model/i-user.model';
//import { EditUserComponent } from '../edit-user/edit-user.component';  // Adicione a importação do componente de edição

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.page.html',
  styleUrls: ['./user-control.page.scss'],
})
export class UserControlPage implements OnInit {
  @Input() filter: string | undefined;
  users: IUser[] = [];
  filteredUser: IUser[] = [];

  constructor(
    private authService: AuthenticationService,
    private modalController: ModalController  // Adicione o ModalController
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter']) {
      this.applyFilter();
    }
  }

  getUsers(){
    this.authService.getAllUsers().subscribe((users: IUser[]) => {
        this.users = users;
        this.applyFilter();
      });
  }
  
  deactivateUser(user: IUser) {
    user.isActive = !user.isActive;
    this.authService.updateVisibility(user).subscribe(() => {
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.filter === 'Active') {
      this.filteredUser = this.users.filter((user) => user.isActive);
    } else if (this.filter === 'NonActive') {
      this.filteredUser = this.users.filter((user) => !user.isActive);
    } else {
      this.filteredUser = this.users;
    }
  }

  // Método para abrir o modal de edição do usuário
  async openEditUserModal(user: IUser) {
    /*const modal = await this.modalController.create({
      component: EditUserComponent,
      componentProps: {
        user: user,
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (data?.message === 'confirmed') {
      this.getUsers();
    }
    }*/
    console.log("OPEN")
  }
}
