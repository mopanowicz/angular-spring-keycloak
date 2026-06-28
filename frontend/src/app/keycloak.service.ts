import Keycloak, { KeycloakInstance } from 'keycloak-js';

export class KeycloakService {
  static instance: KeycloakInstance | null = null;
  static _keycloak!: KeycloakInstance;

  static async init(): Promise<void> {
    // Basic configuration - update environment variables or this block as needed
    const KEYCLOAK_URL = (window as any).__env?.KEYCLOAK_URL || 'https://keycloak.example.com/auth';
    const KEYCLOAK_REALM = (window as any).__env?.KEYCLOAK_REALM || 'myrealm';
    const KEYCLOAK_CLIENT = (window as any).__env?.KEYCLOAK_CLIENT || 'angular-client';

    this._keycloak = new Keycloak({
      url: KEYCLOAK_URL,
      realm: KEYCLOAK_REALM,
      clientId: KEYCLOAK_CLIENT
    });

    // Initialize and check SSO
    await this._keycloak.init({ onLoad: 'check-sso', silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html' });
    this.instance = this._keycloak;
  }

  static async login(): Promise<void>{
    if(!this._keycloak) return;
    await this._keycloak.login();
  }

  static async logout(): Promise<void>{
    if(!this._keycloak) return;
    await this._keycloak.logout({ redirectUri: window.location.origin });
  }

  static async getToken(): Promise<string | null>{
    if(!this._keycloak) return null;
    if(this._keycloak.token && this._keycloak.tokenParsed){
      // attempt to update token
      try { await this._keycloak.updateToken(30); } catch(e){ /* ignore */ }
      return this._keycloak.token || null;
    }
    return null;
  }
}
