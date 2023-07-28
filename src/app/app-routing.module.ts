import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {CguComponent} from "./cgu/cgu.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {TransferComponent} from "./transfer/transfer.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [
  { 'path' : "" , redirectTo: "accueil", pathMatch: "full"},
  { 'path' : "accueil" , component: HomepageComponent, data: { title: 'Accueil'}},
  { 'path' : "cgu" , component: CguComponent, data: { title: 'CGU'}},
  { 'path' : "se-connecter", component: LoginComponent, data: { title: 'Se connecter'}},
  { 'path' : "s'inscrire", component: RegisterComponent, data: { title: 'S\'inscrire'}},
  { 'path' : "transfert", component : TransferComponent, data: { title: 'Transfert'}},
  { 'path' : "**" , component: NotFoundComponent, data: { title: 'Cette page n\'existe pas'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
