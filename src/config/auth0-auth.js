// @flow

import auth0 from 'auth0-js';
import { navigate } from '@reach/router';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = window.location.origin + '/auth';

class AuthClient {
  login: () => void;
  logout: () => void;
  handleAuthentication: () => void;
  setSession: (any) => void;
  getProfile: (Function) => void;
  isAuthenticated: () => void;

  auth0 = new auth0.WebAuth({
    domain: domain,
    clientID: clientId,
    redirectUri: redirectUri,
    responseType: 'token id_token',
    scope: 'openid profile',
  });

  constructor() {
    this.login = () => {
      this.auth0.authorize();
    };

    this.logout = () => {
      localStorage.removeItem('auth0_access_token');
      localStorage.removeItem('auth0_id_token');
      localStorage.removeItem('auth0_expiration');
      navigate('/');
    };

    this.handleAuthentication = () => {
      this.auth0.parseHash((err, result) => {
        if (result && result.accessToken && result.idToken) {
          this.setSession(result);
        } else if (err) {
          console.log(err);
          navigate('/');
        }
      });
    };

    this.setSession = (result) => {
      const expiration = JSON.stringify(
        result.expiresIn * 1000 + new Date().getTime(),
      );
      localStorage.setItem('auth0_access_token', result.accessToken);
      localStorage.setItem('auth0_id_token', result.idToken);
      localStorage.setItem('auth0_expiration', expiration);
      navigate('/');
    };

    this.getProfile = (callbackFn) => {
      const accessToken = localStorage.getItem('auth0_access_token');
      if (!accessToken) {
        callbackFn(null);
        return;
      }

      this.auth0.client.userInfo(accessToken, (err, profile) => {
        callbackFn(profile);
      });
    };

    this.isAuthenticated = () => {
      // check whether the current time is past the Access Token's expiry time
      const expiration = JSON.parse(localStorage.getItem('auth0_expiration'));
      return new Date().getTime() < expiration;
    };
  }
}

export default AuthClient;
export { redirectUri };
