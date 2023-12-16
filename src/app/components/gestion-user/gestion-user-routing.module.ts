import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'users', component:ListUserComponent}
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class GestionUserRoutingModule { }
