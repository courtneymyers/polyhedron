// @flow

import React from 'react';
import { Global, css } from '@emotion/core';
import type { RouteProps } from '@reach/router';
// contexts
import { UserProvider, UserContext } from 'contexts/user';
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
  ...RouteProps,
  db: Database,
};

function App({ db }: Props) {
  const { userProfile, setUserProfile } = React.useContext(UserContext);

  React.useEffect(() => {
    new MgtClient().getAccessToken();
    new AuthClient().getProfile((profile) => setUserProfile(profile));
  }, [setUserProfile]);

  // remove 'auth0|' prefix to set userId
  const userId = userProfile ? userProfile.sub.split('auth0|').pop() : null;

  return (
    <>
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
    </>
  );
}

export default function AppContainer({ ...props }: Props) {
  return (
    <UserProvider>
      <App {...props} />
    </UserProvider>
  );
}
