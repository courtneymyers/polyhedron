// @flow

import React from 'react';
// authentication
import Auth from 'authentication/auth0.js';

const handleAuthentication = (location: Object) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    const auth = new Auth();
    auth.handleAuthentication();
  }
};

// --- components
type Props = {
  // reach router props
  navigate: Object,
  location: Object,
};

const AuthCallback = (props: Props) => (
  <>
    {handleAuthentication(props.location)}
    <p>Authenticating...</p>
  </>
);

export default AuthCallback;
