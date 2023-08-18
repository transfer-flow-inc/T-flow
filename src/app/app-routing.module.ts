import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {CguComponent} from "./cgu/cgu.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {TransferComponent} from "./transfer/transfer.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AutorizeGuardService} from "../services/autorize-guard/autorize-guard.service";
import {SettingsMyAccountComponent} from "./settings-my-account/settings-my-account.component";
import {SettingsPreferencesComponent} from "./settings-preferences/settings-preferences.component";
import {SettingsSubscriptionComponent} from "./settings-subscription/settings-subscription.component";
import {LogoutComponent} from "./logout/logout.component";


const routes: Routes = [
  { 'path' : "" , redirectTo: "accueil", pathMatch: "full"},
  { 'path' : "accueil" , component: HomepageComponent, data: { title: 'Accueil'}},
  { 'path' : "cgu" , component: CguComponent, data: { title: 'CGU'}},
  { 'path' : "se-connecter", component: LoginComponent, data: { title: 'Se connecter'}},
  { 'path' : "s'inscrire", component: RegisterComponent, data: { title: 'S\'inscrire'}},
  { 'path' : "se-deconnecter", component: LogoutComponent, data: { title: 'Se déconnecter'}},
  { 'path' : "transfert", component : TransferComponent,canActivate : [AutorizeGuardService], data: { title: 'Transfert'}},
  { 'path' : "reglages", component: SettingsMyAccountComponent, canActivate : [AutorizeGuardService], data: { title: 'Réglages'}},
  { 'path' : "reglages/mon-compte", component: SettingsMyAccountComponent, canActivate : [AutorizeGuardService], data: { title: 'Mon compte'}},
  { 'path' : "reglages/mes-preferences", component: SettingsPreferencesComponent, canActivate : [AutorizeGuardService], data: { title: 'Mes préférences'}},
  { 'path' : "reglages/mon-abonnement", component: SettingsSubscriptionComponent, canActivate : [AutorizeGuardService], data: { title: 'Mon abonnement'}},
  { 'path' : "**" , component: NotFoundComponent, data: { title: 'Cette page n\'existe pas'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
