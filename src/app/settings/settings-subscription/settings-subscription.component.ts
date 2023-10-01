import { Component, OnInit } from '@angular/core';
import { JwtTokenService } from '../../../services/jwt-token/jwt-token.service';
import { CookiesService } from '../../../services/cookies/cookies.service';
import { Router } from '@angular/router';
import { UserInterface } from '../../../interfaces/User/user-interface';

@Component({
  selector: 'app-settings-subscription',
  templateUrl: './settings-subscription.component.html',
  styleUrls: ['./settings-subscription.component.css'],
})
export class SettingsSubscriptionComponent implements OnInit {
  user: UserInterface = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    userEmail: '',
    password: '',
    avatar: '',
    roles: [''],
    isAccountVerified: false,
    plan: '',
    authMethod: '',
    userFolders: [],
  };

  constructor(
    private jwtService: JwtTokenService,
    private cookiesService: CookiesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeUser();
  }

  initializeUser(): void {
    const token = this.getTokenFromCookies();
    if (!token) {
      this.redirectToLogin();
      return;
    }
    this.setUserPlan(token);
  }

  getTokenFromCookies(): string | null {
    return this.cookiesService.get('token');
  }

  redirectToLogin(): void {
    this.router.navigate(['/se-connecter']);
  }

  setUserPlan(token: string): void {
    this.jwtService.setToken(token);
    const plan = this.jwtService.getUserPlan();
    this.user.plan = this.getReadablePlan(plan);
  }

  getReadablePlan(plan: string): string {
    switch (plan) {
      case 'FREE':
        return "Vous n'avez pas d'abonnement actif";
      case 'PREMIUM':
        return 'Premium';
      case 'ULTIMATE':
        return 'Ultimate';
      default:
        return 'Unspecified';
    }
  }
}
