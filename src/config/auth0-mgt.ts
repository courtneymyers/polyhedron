import { redirectUri } from 'config/auth0-auth';
import { Response } from 'request';
const request = require('request');

const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
const mgtClientId = process.env.REACT_APP_AUTH0_MANAGEMENT_CLIENT_ID || '';
const mgtClientSec = process.env.REACT_APP_AUTH0_MANAGEMENT_CLIENT_SECRET || '';

class MgtClient {
  getAccessToken: () => void;
  getCallbackUrls: (accessToken: string) => void;
  addDomainToCallbackUrls: (
    accessToken: string,
    existingCallbacks: string[],
  ) => void;

  constructor() {
    this.getAccessToken = () => {
      const options = {
        method: 'POST',
        url: `https://${domain}/oauth/token`,
        headers: { 'content-type': 'application/json' },
        body: {
          grant_type: 'client_credentials',
          client_id: mgtClientId,
          client_secret: mgtClientSec,
          audience: `https://${domain}/api/v2/`,
        },
        json: true,
      };

      request(options, (err: any, res: Response, body: any) => {
        if (err) throw new Error(err);

        this.getCallbackUrls(body.access_token);
      });
    };

    this.getCallbackUrls = (accessToken) => {
      const options = {
        method: 'GET',
        url: `https://${domain}/api/v2/clients/${clientId}?fields=callbacks`,
        headers: {
          authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json',
        },
      };

      request(options, (err: any, res: Response, body: any) => {
        if (err) throw new Error(err);

        this.addDomainToCallbackUrls(accessToken, JSON.parse(body).callbacks);
      });
    };

    this.addDomainToCallbackUrls = (accessToken, existingCallbacks) => {
      if (existingCallbacks.includes(redirectUri)) return;

      const updatedCallbacks = JSON.stringify({
        callbacks: existingCallbacks.concat(redirectUri),
      });

      const options = {
        method: 'PATCH',
        url: `https://${domain}/api/v2/clients/${clientId}`,
        headers: {
          authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json',
        },
        body: updatedCallbacks,
      };

      request(options, (err: any, res: Response, body: any) => {
        if (err) throw new Error(err);
      });
    };
  }
}

export default MgtClient;
