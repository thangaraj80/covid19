import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PlottingModule } from './plotting/plotting.module';
import { CountryViewComponent } from './country-view/country-view.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  imports: [
  
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    PlottingModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAL-GQsV9DJoquuWwAeqf6zk9ucDnwUCHA'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CountryViewComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
