interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'f_sQmOVL5f_7B5fNe3GxtUqLlPyVnkBi',
  domain: 'kareday.eu.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
