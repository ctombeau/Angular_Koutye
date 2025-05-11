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
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { StoreModule } from '@ngrx/store';
import { metaReducers, rootReducer } from './state/koutye-reducer';


export function HttpLoaderFactory(http: HttpClient){
   return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FrontModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgImageSliderModule,
    HttpClientModule,
    TranslateModule.forRoot({
       //defaultLanguage: 'en',
       loader:{
           provide:TranslateLoader,
           useFactory:(HttpLoaderFactory),
           deps:[HttpClient]
       }
    }),
    StoreModule.forRoot({
      root: rootReducer
    }, {
       metaReducers : metaReducers
    })
    
  ],
  providers: [
    //{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    TranslateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
     },
     provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
