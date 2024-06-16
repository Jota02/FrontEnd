import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/services/api/auth/authentication.service';

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
    private loadingCtrl : LoadingController
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

    await firstValueFrom(this.authService.signin(form.value)).catch(async error => {
      await loading.dismiss();
      alert("wrong email or pwd."); //TODO TOAST
    });


    await loading.dismiss();
    await this.router.navigateByUrl('/home', { replaceUrl: true })
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