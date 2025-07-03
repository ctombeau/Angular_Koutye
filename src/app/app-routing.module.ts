import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/front/login/login.component';
import { HomeComponent } from './components/front/home/home.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';
import { ListUserComponent } from './components/gestion-user/list-user/list-user.component';
import { RegisterComponent } from './components/gestion-user/register/register.component';
import { ForgotpasswordComponent } from './components/gestion-user/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/gestion-user/resetpassword/resetpassword.component';
import { UserHomeComponent } from './components/gestion-user/user-home/user-home.component';
import { UserDetailComponent } from './components/gestion-user/user-detail/user-detail.component';
import { CourtierComponent } from './components/gestion-user/courtier/courtier.component';
import { ListAppartementComponent } from './components/gestion-appartement/list-appartement/list-appartement.component';

const routes: Routes = [
   
  {path: 'user',
       loadChildren:()=>import('./components/gestion-user/gestion-user.module').then((m)=>m.GestionUserModule)},
  {path:'appartement',
    loadChildren:()=>import('./components/gestion-appartement/gestion-appartement.module').then((m)=>m.GestionAppartementModule)
  },
  /*
  {path: 'home', component:HomeComponent},
  {path:'',component:LoginComponent, data:{message: ""}},
  {path: 'user/list', component:ListUserComponent, canActivate:[AuthGuard]},
  {path:'user/add', component:RegisterComponent},
  {path:'user/forgot-password',component:ForgotpasswordComponent},
  {path:'user/reset-password',component:ResetpasswordComponent},
  {path:'user/home', component: UserHomeComponent,canActivate:[AuthGuard]},
  {path:'user/detail',component: UserDetailComponent,canActivate:[AuthGuard]},
  {path:'user/courtier', component:CourtierComponent,canActivate:[AuthGuard]},
  {path: 'appartement/list-appartement', component:ListAppartementComponent, canActivate:[AuthGuard]},
  {path: 'notfound', component: NotfoundComponent},
  {path:'**', redirectTo:'notfound'}
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
