import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {CguComponent} from "./cgu/cgu.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  // { 'path' : "" , redirectTo: "accueil", pathMatch: "full"},
  // { 'path' : "accueil" , component: HomepageComponent, data: { title: 'Accueil'}},
  { 'path' : "" , component: HomepageComponent},
  { 'path' : "cgu" , component: CguComponent, data: { title: 'CGU'}},
  { 'path' : "**" , component: NotFoundComponent, data: { title: 'Cette page n\'existe pas'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
