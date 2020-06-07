import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'; // Add this
import { ListComponent } from './list/list.component'; // Add this
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthenticatedViewComponent } from './authenticated-view/authenticated-view.component';
import { AdministratorViewComponent } from './administrator-view/administrator-view.component';


const routes: Routes = [
  { path: '', component: HomeComponent },              // Add this
  { path: 'list', component: ListComponent },
  { path: "register", component:RegisterComponent },
  { path: "login", component:LoginComponent },
  { path: "administrator-view", component:AdministratorViewComponent },
  { path: "authenticated-view", component:AuthenticatedViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }