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
      {path: 'users', component:ListUserComponent, canActivate:[AuthGuard]},
      {path:'register', component:RegisterComponent,canActivate:[AuthGuard]},
      {path:'forgot-password',component:ForgotpasswordComponent},
      {path:'reset-password',component:ResetpasswordComponent},
      {path:'user-home', component: UserHomeComponent,canActivate:[AuthGuard]},
      {path:'user-detail',component: UserDetailComponent,canActivate:[AuthGuard]},
      {path:'courtier', component:CourtierComponent,canActivate:[AuthGuard]},
      
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class GestionUserRoutingModule { }
