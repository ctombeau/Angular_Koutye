import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GestionUserRoutingModule } from './gestion-user-routing.module';
import { RegisterComponent } from './register/register.component';
import { FrontModule } from '../front/front.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ListUserComponent,
    RegisterComponent
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
