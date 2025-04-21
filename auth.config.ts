import { AuthConfig } from 'angular-oauth2-oidc';

export const auth: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId: '355764264205-muopm2alijn6bnk30qfkrk32kntnq3hq.apps.googleusercontent.com',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false
}