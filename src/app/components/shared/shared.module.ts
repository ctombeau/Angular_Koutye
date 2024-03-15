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
import { Router, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSnackBarModule} from '@angular/material/snack-bar';
/*
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}
*/

const MaterialComponents=[
  MatFormFieldModule, 
  MatInputModule, 
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
     HeaderComponent,
     FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialComponents,
    ReactiveFormsModule,
    TranslateModule,
    TranslateModule.forRoot({
      //defaultLanguage: 'en',
      /*
      loader:{
          provide:TranslateLoader,
          useFactory:(HttpLoaderFactory),
          deps:[HttpClient]
      }
      */
   })
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    MaterialComponents,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule
  ],
  //providers:[TranslateService]
})
export class SharedModule { }
