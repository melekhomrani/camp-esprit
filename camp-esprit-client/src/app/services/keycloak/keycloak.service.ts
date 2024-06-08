import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UserProfile } from './user-profile';

@Injectable({ providedIn: 'root' })
export class KeycloakOperationService {

  _profile: UserProfile | undefined;

  constructor(private readonly keycloak: KeycloakService) {}

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }
  logout(): void {
    this.keycloak.logout();
  }
  async getUserProfile(): Promise<UserProfile> {
    return this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
  }
}
