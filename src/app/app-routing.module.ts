import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {ValidateEmailComponent} from "./validate-email/validate-email.component";
import {AboutComponent} from "./about/about.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {DashboardAllUsersComponent} from "./dashboard-all-users/dashboard-all-users.component";
import {AdminAutorizeGuardService} from "../services/admin-autorize-guard/admin-autorize-guard.service";
import {DashboardAllSupportComponent} from "./dashboard-all-support/dashboard-all-support.component";
import {DashboardOneSupportComponent} from "./dashboard-one-support/dashboard-one-support.component";


const routes: Routes = [
  { 'path' : "accueil" , component: HomepageComponent, data: { title: 'Accueil'}},
  { 'path' : "conditions-generales-utilisation" , component: CguComponent, data: { title: 'CGU'}},
  { 'path' : "politique-de-confidentialite" , component: PrivacyPolicyComponent, data: { title: 'Politique de confidentialité'}},
  { 'path' : "se-connecter", component: LoginComponent, data: { title: 'Se connecter'}},
  { 'path' : "s'inscrire", component: RegisterComponent, data: { title: 'S\'inscrire'}},
  { 'path' : "se-deconnecter", component: LogoutComponent, data: { title: 'Se déconnecter'}},
  { 'path' : "transfert", component : TransferComponent,canActivate : [AutorizeGuardService], data: { title: 'Transfert'}},
  { 'path' : "tout-les-abonnements", component: SubscriptionsComponent, data: { title: 'Tout les abonnements'}},
  { 'path' : "reglages", component: SettingsMyAccountComponent, canActivate : [AutorizeGuardService], data: { title: 'Réglages'}},
  { 'path' : "nous-contacter", component: ContactUsComponent,canActivate: [AutorizeGuardService], data: { title: 'Nous contacter'}},
  { 'path' : "a-propos", component: AboutComponent, data: { title: 'A propos'}},
  { 'path' : "valider-mon-compte/:token", component: ValidateEmailComponent, data: { title: 'Valider mon compte'}},
  { 'path' : "admin/dashboard", component : DashboardAllUsersComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Dashboard'}},
  { 'path' : "admin/dashboard/tout-les-utilisateurs", component : DashboardAllUsersComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Dashboard'}},
  { 'path' : "admin/dashboard/tout-les-support", component: DashboardAllSupportComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Tout les support'}},
  { 'path' : "admin/dashboard/support/:id", component: DashboardOneSupportComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Support'}},
  { 'path' : "telechargement/:folderUrl", component: DownloadComponent, data: { title: 'Téléchargement'}},
  { 'path' : "telechargement/:folderUrl/:accessKey", component: DownloadComponent, data: { title: 'Téléchargement'}},
  { 'path' : "reglages/mon-compte", component: SettingsMyAccountComponent, canActivate : [AutorizeGuardService], data: { title: 'Mon compte'}},
  { 'path' : "reglages/mes-transferts", component: SettingsAllTransferComponent, canActivate : [AutorizeGuardService], data: { title: 'Mes Transferts'}},
  { 'path' : "reglages/mon-abonnement", component: SettingsSubscriptionComponent, canActivate : [AutorizeGuardService], data: { title: 'Mon abonnement'}},
  { 'path' : "" , redirectTo: "accueil", pathMatch: "full"},
  { 'path' : "**" , component: NotFoundComponent, data: { title: 'Cette page n\'existe pas'}},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
