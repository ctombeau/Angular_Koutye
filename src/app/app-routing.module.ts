import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/front/login/login.component';
import { HomeComponent } from './components/front/home/home.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';

const routes: Routes = [
   //{path:'',component: LoginComponent},
   //{path:'home', component:HomeComponent}
   {path: 'notfound', component: NotfoundComponent},
  {path:'**', redirectTo:'notfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
