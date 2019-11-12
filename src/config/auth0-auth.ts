import auth0, {
  Auth0Error,
  Auth0DecodedHash,
  Auth0UserProfile,
} from 'auth0-js';
import { navigate } from '@reach/router';

const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
const redirectUri = window.location.origin + '/auth';

class AuthClient {
  login: () => void;
  logout: () => void;
  handleAuthentication: () => void;
  setSession: (authRes: Auth0DecodedHash) => void;
  getProfile: (callbackFn: (profile: Auth0UserProfile | null) => void) => void;
  isAuthenticated: () => boolean;

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
      this.auth0.parseHash((err, res) => {
        if (res && res.expiresIn && res.accessToken && res.idToken) {
          this.setSession(res);
        } else if (err) {
          console.log(err);
          navigate('/');
        }
      });
    };

    this.setSession = (authRes) => {
      if (!authRes.expiresIn || !authRes.accessToken || !authRes.idToken) {
        return;
      }

      const expiration = JSON.stringify(
        authRes.expiresIn * 1000 + new Date().getTime(),
      );

      localStorage.setItem('auth0_access_token', authRes.accessToken);
      localStorage.setItem('auth0_id_token', authRes.idToken);
      localStorage.setItem('auth0_expiration', expiration);
      navigate('/');
    };

    this.getProfile = (
      callbackFn: (profile: Auth0UserProfile | null) => void,
    ) => {
      const accessToken = localStorage.getItem('auth0_access_token');
      if (!accessToken) {
        callbackFn(null);
        return;
      }

      this.auth0.client.userInfo(
        accessToken,
        (err: Auth0Error | null, profile: Auth0UserProfile) => {
          callbackFn(profile);
        },
      );
    };

    this.isAuthenticated = () => {
      // check whether the current time is past the Access Token's expiry time
      const expirationStr = localStorage.getItem('auth0_expiration');
      if (!expirationStr) return false;
      return new Date().getTime() < JSON.parse(expirationStr);
    };
  }
}

export default AuthClient;
export { redirectUri };
