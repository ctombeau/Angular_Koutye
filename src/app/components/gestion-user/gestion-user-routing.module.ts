import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CourtierComponent } from './courtier/courtier.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NotfoundComponent } from '../shared/notfound/notfound.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
     
      {path: 'list', component:ListUserComponent, canActivate:[AuthGuard]},
      {path:'add', component:RegisterComponent},
      {path:'forgot-password',component:ForgotpasswordComponent},
      {path:'reset-password',component:ResetpasswordComponent},
      {path:'home', component: UserHomeComponent,canActivate:[AuthGuard]},
      {path:'detail',component: UserDetailComponent,canActivate:[AuthGuard]},
      {path:'courtier', component:CourtierComponent,canActivate:[AuthGuard]} 
      
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class GestionUserRoutingModule { }
