import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private authService: MsalService) {}

  login() {
    this.authService.loginRedirect();
  }

  logout() {
    this.authService.logout();
  }

  getAuthUser() {
    return this.authService.instance.getAllAccounts()?.[0];
  }
}
