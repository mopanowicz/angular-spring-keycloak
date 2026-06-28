import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from './keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="font-family: Arial, Helvetica, sans-serif; padding: 1rem">
      <h1>Angular 20 + Keycloak demo</h1>
      <p *ngIf="!kc.authenticated">Not authenticated</p>
      <p *ngIf="kc.authenticated">Authenticated as: {{ kc.profile?.preferred_username || kc.profile?.email }}</p>

      <button (click)="login()" *ngIf="!kc.authenticated">Login</button>
      <button (click)="logout()" *ngIf="kc.authenticated">Logout</button>

      <hr>
      <h3>API calls</h3>
      <button (click)="callPublic()">Call Public API</button>
      <button (click)="callSecure()" [disabled]="!kc.authenticated">Call Secure API</button>

      <pre>{{ result }}</pre>
    </div>
  `
})
export class AppComponent {
  kc = KeycloakService.instance;
  result = '';

  login() { KeycloakService.login(); }
  logout() { KeycloakService.logout(); }

  async callPublic(){
    this.result = '...';
    try{
      const r = await fetch('/api/public');
      this.result = await r.text();
    }catch(e){ this.result = ''+e }
  }

  async callSecure(){
    this.result = '...';
    try{
      const token = await KeycloakService.getToken();
      const r = await fetch('/api/secure', { headers: { Authorization: `Bearer ${token}` } });
      this.result = await r.text();
    }catch(e){ this.result = ''+e }
  }
}
