import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from "@angular/forms";
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const MaterialComponents=[
  MatFormFieldModule, 
  MatInputModule, 
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
     HeaderComponent,
     FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialComponents,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    MaterialComponents,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
