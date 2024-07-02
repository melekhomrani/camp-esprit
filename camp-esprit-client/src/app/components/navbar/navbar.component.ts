import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { KeycloakOperationService } from 'src/app/services/keycloak/keycloak.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentRoute: string = '';

  username = this.keycloakService._profile?.username;

  constructor(private keycloakService: KeycloakOperationService, private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  logout(): void {
    this.keycloakService.logout();
  }

}
