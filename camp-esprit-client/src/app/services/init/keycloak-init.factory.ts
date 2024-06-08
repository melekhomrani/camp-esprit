import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/app/utils/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.kcUrl,
        realm: environment.kcRealm,
        clientId: environment.kcClientId,
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
    });
}
