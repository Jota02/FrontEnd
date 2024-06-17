import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/services/api/auth/authentication.service';
import { ToastController } from '@ionic/angular';

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
        duration: 3000,
        position: 'middle',
        color: 'danger',
        cssClass: 'custom-toast'
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
}