import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { FrontRoutingModule } from './front-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgImageSliderModule } from 'ng-image-slider';
import { GestionAppartementModule } from '../gestion-appartement/gestion-appartement.module';
import { ListAppartementComponent } from '../gestion-appartement/list-appartement/list-appartement.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    NgImageSliderModule,
    GestionAppartementModule
  ]
})
export class FrontModule { }
