import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GestionUserRoutingModule } from './gestion-user-routing.module';



@NgModule({
  declarations: [
    ListUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GestionUserRoutingModule
  ],
  exports:[]
})
export class GestionUserModule { }
