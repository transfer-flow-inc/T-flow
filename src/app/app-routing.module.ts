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
import {DashboardOneUserComponent} from "./dashboard-one-user/dashboard-one-user.component";
import {DashboardAllTransferComponent} from "./dashboard-all-transfer/dashboard-all-transfer.component";
import {DashboardOneTransferComponent} from "./dashboard-one-transfer/dashboard-one-transfer.component";
import {DashboardAllProvidersComponent} from "./dashboard-all-providers/dashboard-all-providers.component";
import {TransferRecapComponent} from "./transfer-recap/transfer-recap.component";
import {DeleteUserComponent} from "./delete-user/delete-user.component";


const routes: Routes = [
  { 'path' : "accueil" , component: HomepageComponent, data: { title: 'Accueil'}},
  { 'path' : "conditions-generales-utilisation" , component: CguComponent, data: { title: 'CGU'}},
  { 'path' : "politique-de-confidentialite" , component: PrivacyPolicyComponent, data: { title: 'Politique de confidentialité'}},
  { 'path' : "se-connecter", component: LoginComponent, data: { title: 'Se connecter'}},
  { 'path' : "s'inscrire", component: RegisterComponent, data: { title: 'S\'inscrire'}},
  { 'path' : "se-deconnecter", component: LogoutComponent, data: { title: 'Se déconnecter'}},
  { 'path' : "transfert", component : TransferComponent,canActivate : [AutorizeGuardService], data: { title: 'Transfert'}},
  { 'path' : "transfert/recapitulatif/:folderID" , component : TransferRecapComponent, canActivate : [AutorizeGuardService], data: { title: 'Récapitulatif du transfert'}},
  { 'path' : "tout-les-abonnements", component: SubscriptionsComponent, data: { title: 'Tout les abonnements'}},
  { 'path' : "nous-contacter", component: ContactUsComponent, canActivate: [AutorizeGuardService], data: { title: 'Nous contacter'}},
  { 'path' : "a-propos", component: AboutComponent, data: { title: 'A propos'}},
  { 'path' : "valider-mon-compte/:token", component: ValidateEmailComponent, data: { title: 'Valider mon compte'}},
  { 'path' : "admin/dashboard", redirectTo: "admin/dashboard/gestionnaires", pathMatch: "full"},
  { 'path' : "admin/dashboard/gestionnaires", component : DashboardAllProvidersComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Fournisseurs'}},
  { 'path' : "admin/dashboard/utilisateurs", component : DashboardAllUsersComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Utilisateurs'}},
  { 'path' : "admin/dashboard/utilisateurs/detail/:id", component: DashboardOneUserComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Utilisateur'}},
  { 'path' : "admin/dashboard/utilisateurs/transferts/:id", component: DashboardAllTransferComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Transferts'}},
  { 'path' : "admin/dashboard/utilisateurs/transferts/detail/:id", component: DashboardOneTransferComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Transfert'}},
  { 'path' : "admin/dashboard/supports", component: DashboardAllSupportComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Supports'}},
  { 'path' : "admin/dashboard/supports/detail/:id", component: DashboardOneSupportComponent, canActivate : [AutorizeGuardService, AdminAutorizeGuardService], data: { title: 'Support'}},
  { 'path' : "telechargement/:folderUrl", component: DownloadComponent, data: { title: 'Téléchargement'}},
  { 'path' : "telechargement/:folderUrl/:accessKey", component: DownloadComponent, data: { title: 'Téléchargement'}},
  { 'path' : "reglages", redirectTo: "reglages/mon-compte", pathMatch: "full" },
  { 'path' : "reglages/mon-compte", component: SettingsMyAccountComponent, canActivate : [AutorizeGuardService], data: { title: 'Mon compte'}},
  { 'path' : "reglages/mes-transferts", component: SettingsAllTransferComponent, canActivate : [AutorizeGuardService], data: { title: 'Mes Transferts'}},
  { 'path' : "reglages/mon-abonnement", component: SettingsSubscriptionComponent, canActivate : [AutorizeGuardService], data: { title: 'Mon abonnement'}},
  { 'path' : "supprimer-mon-compte/:userID/:deletionKey", component: DeleteUserComponent, data: { title: 'Supprimer mon compte'}},
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
