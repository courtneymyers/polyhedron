import React from 'react';
import { RouteComponentProps } from '@reach/router';
// authentication
import AuthClient from 'config/auth0-auth';

type Props = {};

function AuthCallback({ ...props }: Props & RouteComponentProps) {
  React.useEffect(() => {
    if (!props.location) return;

    if (/access_token|id_token|error/.test(props.location.hash)) {
      const auth = new AuthClient();
      auth.handleAuthentication();
    }
  }, [props.location]);

  return <p>Authenticating...</p>;
}

export default AuthCallback;
