// @flow

import { redirectUri } from 'authentication/auth0-auth.js';
const request = require('request');

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const mgtClientId = process.env.REACT_APP_AUTH0_MANAGEMENT_CLIENT_ID;
const mgtClientSecret = process.env.REACT_APP_AUTH0_MANAGEMENT_CLIENT_SECRET;

export default class MgtClient {
  getAccessToken: () => void;
  getCallbackUrls: (string) => void;
  addDomainToCallbackUrls: (string, Array<string>) => void;

  constructor() {
    this.getAccessToken = () => {
      const options = {
        method: 'POST',
        url: `https://${domain}/oauth/token`,
        headers: { 'content-type': 'application/json' },
        body: {
          grant_type: 'client_credentials',
          client_id: mgtClientId,
          client_secret: mgtClientSecret,
          audience: `https://${domain}/api/v2/`,
        },
        json: true,
      };

      /* prettier-ignore */
      request(options, function(error, response, body) {
        if (error) throw new Error(error);

        this.getCallbackUrls(body.access_token);
      }.bind(this));
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

      /* prettier-ignore */
      request(options, function(error, response, body) {
        if (error) throw new Error(error);

        this.addDomainToCallbackUrls(accessToken, JSON.parse(body).callbacks);
      }.bind(this));
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

      request(options, function(error, response, body) {
        if (error) throw new Error(error);
      });
    };
  }
}
