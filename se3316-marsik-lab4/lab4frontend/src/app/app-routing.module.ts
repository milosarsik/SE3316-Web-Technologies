import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetComponent } from './get/get.component'; // Add this
import { PostComponent } from './post/post.component'; // Add this


const routes: Routes = [
  { path: '', component: GetComponent },              // Add this
  { path: 'post', component: PostComponent }           // Add this
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }