// @flow

import React from 'react';
import type { RouteProps } from '@reach/router';
// authentication
import AuthClient from 'config/auth0-auth';

const handleAuthentication = (location: Object) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    const auth = new AuthClient();
    auth.handleAuthentication();
  }
};

// --- components
type Props = {
  ...RouteProps,
};

const AuthCallback = ({ ...props }: Props) => (
  <>
    {handleAuthentication(props.location)}
    <p>Authenticating...</p>
  </>
);

export default AuthCallback;
