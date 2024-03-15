import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'home', component:HomeComponent},
      {path:'',component:LoginComponent, data:{message: ""}}
    ])
  ],
  exports:[RouterModule]
})
export class FrontRoutingModule { }
