import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ListAppartementComponent } from './list-appartement/list-appartement.component';
import { AppartementDetailComponent } from './appartement-detail/appartement-detail.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    RouterModule.forChild([
      
      {path: 'list-appartement', component:ListAppartementComponent, canActivate:[AuthGuard]},
      {path:'detail-appartement', component:AppartementDetailComponent, canActivate:[AuthGuard]}
    ])
      
  ],
  exports:[
    RouterModule
  ]
})

export class GestionAppartementRoutingModule { }
