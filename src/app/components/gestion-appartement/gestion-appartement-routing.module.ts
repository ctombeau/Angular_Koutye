import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ListAppartementComponent } from './list-appartement/list-appartement.component';
import { AppartementDetailComponent } from './appartement-detail/appartement-detail.component';
import { AddAppartementComponent } from './add-appartement/add-appartement.component';
import { ImageAppartementComponent } from './image-appartement/image-appartement.component';
import { VideoAppartementComponent } from './video-appartement/video-appartement.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    RouterModule.forChild([
      
      {path:'list-appartement', component:ListAppartementComponent, canActivate:[AuthGuard]},
      {path:'detail-appartement', component:AppartementDetailComponent, canActivate:[AuthGuard]},
      {path:'add-appartement', component:AddAppartementComponent, canActivate:[AuthGuard]},
      {path:'image-appartement', component:ImageAppartementComponent, canActivate:[AuthGuard]},
      {path:'video-appartement', component: VideoAppartementComponent, canActivate:[AuthGuard]}
    ])
      
  ],
  exports:[
    RouterModule
  ]
})

export class GestionAppartementRoutingModule { }
