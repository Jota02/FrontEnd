import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./private/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'signin',
    loadChildren: () => import('./public/signin/signin.module').then(m => m.SigninPageModule),
    canLoad: [AutoLoginGuard] 
  },
  {
    path: 'user-control',
    loadChildren: () => import('./private/user-control/user-control.module').then( m => m.UserControlPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./public/signup/signup.module').then( m => m.SignupPageModule),
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
