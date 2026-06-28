import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { KeycloakService } from './app/keycloak.service';

// Initialize Keycloak before bootstrapping the Angular app
KeycloakService.init().then(() => {
  bootstrapApplication(AppComponent)
    .catch(err => console.error(err));
});
