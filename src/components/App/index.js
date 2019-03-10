// @flow

import React from 'react';
import { Global, css } from '@emotion/core';
import type { RouteProps } from '@reach/router';
// contexts
import { ProjectsProvider } from 'contexts/projects';
import { BlocksProvider } from 'contexts/blocks';
// components
import AppDragDrop from 'components/AppDragDrop';
import AppLoggedOut from 'components/AppLoggedOut';
// authentication
import AuthClient from 'config/auth0-auth';
import MgtClient from 'config/auth0-mgt';
// types
import type { Profile } from 'contexts/user';

export type Database = 'memory' | 'firebase';

type Props = {
  ...RouteProps,
  db: Database,
  // context props
  userId: string,
  storeUserProfile: (Profile) => void,
};
type State = {};

class App extends React.Component<Props, State> {
  auth = new AuthClient();
  authMgt = new MgtClient();

  componentDidMount() {
    this.authMgt.getAccessToken();
    this.auth.getProfile((profile) => this.props.storeUserProfile(profile));
  }

  render() {
    const { userId, db } = this.props;

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
}

export default App;
