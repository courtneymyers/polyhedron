/** @jsx jsx */

import React from 'react';
import { Global, css, jsx } from '@emotion/core';
import { RouteComponentProps } from '@reach/router';
import { Auth0UserProfile } from 'auth0-js';
// contexts
import { UserProvider, useUserContext } from 'contexts/user';
import { ProjectsProvider } from 'contexts/projects';
import { BlocksProvider } from 'contexts/blocks';
// components
import AppDragDrop from 'components/AppDragDrop';
import AppLoggedOut from 'components/AppLoggedOut';
// authentication
import AuthClient from 'config/auth0-auth';
import MgtClient from 'config/auth0-mgt';

export type Database = 'memory' | 'firebase';

type Props = {
  db: Database;
};

function App({ db }: Props & RouteComponentProps) {
  const { userProfile, setUserProfile } = useUserContext();

  React.useEffect(() => {
    new MgtClient().getAccessToken();
    new AuthClient().getProfile((profile: Auth0UserProfile | null) => {
      setUserProfile(profile);
    });
  }, [setUserProfile]);

  // remove 'auth0|' prefix to set userId
  const userId = userProfile ? userProfile.sub.split('auth0|').pop() : null;

  return (
    <React.Fragment>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: sans-serif;
            font-size: 16px;
            line-height: 1;
            color: #444;
            background-color: #fff;
            scroll-behavior: smooth;
          }
        `}
      />

      {!userId ? (
        <AppLoggedOut />
      ) : (
        <ProjectsProvider userId={userId} db={db}>
          <BlocksProvider userId={userId} db={db}>
            <AppDragDrop />
          </BlocksProvider>
        </ProjectsProvider>
      )}
    </React.Fragment>
  );
}

export default function AppContainer({ ...props }: Props) {
  return (
    <UserProvider>
      <App {...props} />
    </UserProvider>
  );
}
