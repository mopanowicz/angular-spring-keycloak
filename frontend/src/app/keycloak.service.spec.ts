import { KeycloakService } from './keycloak.service';

describe('KeycloakService (static)', () => {
  beforeEach(() => {
    (KeycloakService as any)._keycloak = null;
    (KeycloakService as any).instance = null;
  });

  it('calls login on underlying keycloak instance', async () => {
    const mock = { login: jasmine.createSpy('login') };
    (KeycloakService as any)._keycloak = mock;
    await (KeycloakService as any).login();
    expect(mock.login).toHaveBeenCalled();
  });

  it('calls logout on underlying keycloak instance', async () => {
    const mock = { logout: jasmine.createSpy('logout') };
    (KeycloakService as any)._keycloak = mock;
    await (KeycloakService as any).logout();
    expect(mock.logout).toHaveBeenCalled();
  });

  it('returns token if present and attempts updateToken', async () => {
    const mock = { token: 'abc', tokenParsed: {}, updateToken: jasmine.createSpy('updateToken').and.returnValue(Promise.resolve()) };
    (KeycloakService as any)._keycloak = mock;
    const t = await (KeycloakService as any).getToken();
    expect(t).toBe('abc');
    expect(mock.updateToken).toHaveBeenCalled();
  });
});
