import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {  MatExpansionModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticatedViewComponent } from './authenticated-view/authenticated-view.component';
import { AdministratorViewComponent } from './administrator-view/administrator-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    RegisterComponent,
    LoginComponent,
    AuthenticatedViewComponent,
    AdministratorViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,       // add this
    HttpClientModule,   // Add here
    MatExpansionModule, 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
