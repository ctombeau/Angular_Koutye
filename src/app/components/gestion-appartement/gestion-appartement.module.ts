import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAppartementComponent } from './list-appartement/list-appartement.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { GestionAppartementRoutingModule } from './gestion-appartement-routing.module';



@NgModule({
  declarations: [
    ListAppartementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    GestionAppartementRoutingModule
  ],
  exports:[
    ListAppartementComponent
  ]
})
export class GestionAppartementModule { }
