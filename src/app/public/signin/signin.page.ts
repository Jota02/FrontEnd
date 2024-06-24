import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/services/api/auth/authentication.service';
import { ToastController } from '@ionic/angular';
import { ChangePasswordUserComponent } from 'src/app/components/change-password-user/change-password-user.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  current_year: number = new Date().getFullYear();
  form: FormGroup | any;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private loadingCtrl : LoadingController,
    private toastController: ToastController,
    private modalController: ModalController,
    private navCtrl: NavController
  ) {
    this.setUpSignInForm();
  }

  ngOnInit() { }

  setUpSignInForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(form: FormGroup) {
    const loading = await this.showLoading();
  
    try {
      await firstValueFrom(this.authService.signin(form.value));
      await loading.dismiss();
      await this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error) {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Email ou senha incorretos.',
        position: 'middle',
        color: 'danger',
        cssClass: 'custom-toast',
        buttons: [
          {
            side: 'end',
            icon: 'close-outline',
            role: 'cancel'
          }
        ]
      });
      await toast.present();
    }
      
  }

    //showLoading - Loading controller settings
    async showLoading() {
      const loading = await this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Signing in',
      });
      await loading.present();
      return loading;
    }

    async presentToast(message: string) {
      const toast = await this.toastController.create({
        message,
        duration: 2000,
        position: 'middle',
      });
      await toast.present();
    }
  
    async ChangePassword() {
      const modal = await this.modalController.create({
        component: ChangePasswordUserComponent,
      });
  
      modal.onWillDismiss().then((result) => {
        if (result.data?.message === 'confirmed') {
          this.presentToast('Password changed successfully!');
        }
      });
  
      return await modal.present();
    }

    goToSignup() {
      this.navCtrl.navigateForward('/signup');
    }
}