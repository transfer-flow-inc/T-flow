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
import {SettingsSubscriptionComponent} from "./settings-subscription/settings-subscription.component";
import {LogoutComponent} from "./logout/logout.component";
import {SettingsAllTransferComponent} from "./settings-all-transfer/settings-all-transfer.component";
import {SubscriptionsComponent} from "./subscriptions/subscriptions.component";
import {DownloadComponent} from "./download/download.component";
import {SettingsAdminPanelComponent} from "./settings-admin-panel/settings-admin-panel.component";
import {AdminAutorizeGuardService} from "../services/admin-autorize-guard/admin-autorize-guard.service";


const routes: Routes = [
  { 'path' : "" , redirectTo: "accueil", pathMatch: "full"},
  { 'path' : "accueil" , component: HomepageComponent, data: { title: 'Accueil'}},
  { 'path' : "cgu" , component: CguComponent, data: { title: 'CGU'}},
  { 'path' : "se-connecter", component: LoginComponent, data: { title: 'Se connecter'}},
  { 'path' : "s'inscrire", component: RegisterComponent, data: { title: 'S\'inscrire'}},
  { 'path' : "se-deconnecter", component: LogoutComponent, data: { title: 'Se déconnecter'}},
  { 'path' : "transfert", component : TransferComponent,canActivate : [AutorizeGuardService], data: { title: 'Transfert'}},
  { 'path' : "tout-les-abonnements", component: SubscriptionsComponent, data: { title: 'Tout les abonnements'}},
  { 'path' : "reglages", component: SettingsMyAccountComponent, canActivate : [AutorizeGuardService], data: { title: 'Réglages'}},
  { 'path' : "telechargement/:folderUrl", component: DownloadComponent, data: { title: 'Téléchargement'}},
  { 'path' : "telechargement/:folderUrl/:accessKey", component: DownloadComponent, data: { title: 'Téléchargement'}},
  { 'path' : "reglages/mon-compte", component: SettingsMyAccountComponent, canActivate : [AutorizeGuardService], data: { title: 'Mon compte'}},
  { 'path' : "reglages/mes-transferts", component: SettingsAllTransferComponent, canActivate : [AutorizeGuardService], data: { title: 'Mes Transferts'}},
  { 'path' : "reglages/mon-abonnement", component: SettingsSubscriptionComponent, canActivate : [AutorizeGuardService], data: { title: 'Mon abonnement'}},
  { 'path' : "reglages/admin/dashboard", component : SettingsAdminPanelComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService] ,data: { title: 'Dashboard'}},
  { 'path' : "**" , component: NotFoundComponent, data: { title: 'Cette page n\'existe pas'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
