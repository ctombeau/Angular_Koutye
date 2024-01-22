import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/template/header/header.component';
import { FooterComponent } from './components/shared/template/footer/footer.component';
import { GestionUserModule } from './components/gestion-user/gestion-user.module';
import { SharedModule } from './components/shared/shared.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import { FrontModule } from './components/front/front.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient){
   return new TranslateHttpLoader(http,'/src/locale/i18n/','.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    //GestionUserModule,
    //SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  
    HttpClientModule,
    TranslateModule.forRoot({
       //defaultLanguage: 'en',
       loader:{
           provide:TranslateLoader,
           useFactory:(HttpLoaderFactory),
           deps:[HttpClient]
       }
    })
    
  ],
  providers: [
    //{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
