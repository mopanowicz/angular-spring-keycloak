import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { KeycloakService } from './keycloak.service';

describe('AppComponent', () => {
  beforeEach(() => {
    // ensure we control the KeycloakService instance used by the component
    (KeycloakService as any).instance = { authenticated: false, profile: null };
    TestBed.configureTestingModule({
      imports: [AppComponent]
    });
  });

  it('shows Not authenticated when not logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Not authenticated');
  });

  it('shows username when authenticated', () => {
    (KeycloakService as any).instance = { authenticated: true, profile: { preferred_username: 'tester' } };
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Authenticated as: tester');
  });
});
