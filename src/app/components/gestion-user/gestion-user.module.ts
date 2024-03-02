import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GestionUserRoutingModule } from './gestion-user-routing.module';
import { RegisterComponent } from './register/register.component';
import { FrontModule } from '../front/front.module';
import { SharedModule } from '../shared/shared.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CourtierComponent } from './courtier/courtier.component';



@NgModule({
  declarations: [
    ListUserComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    UserHomeComponent,
    UserDetailComponent,
    CourtierComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    GestionUserRoutingModule
  ],
  exports:[]
})
export class GestionUserModule { }
