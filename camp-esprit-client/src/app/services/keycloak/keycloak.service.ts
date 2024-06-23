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
    if (this._profile) {
      return this._profile;
    }
    this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
    this._profile.token = await this.keycloak.getToken();
    return this._profile;
  }
}
