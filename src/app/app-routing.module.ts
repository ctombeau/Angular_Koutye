import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/front/login/login.component';
import { HomeComponent } from './components/front/home/home.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
   
  {path: 'user',
       loadChildren:()=>import('./components/gestion-user/gestion-user.module').then((m)=>m.GestionUserModule)},
  {path: 'notfound', component: NotfoundComponent},
  {path:'**', redirectTo:'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
