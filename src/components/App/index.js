// @flow

import React from 'react';
// contexts
import { UserProvider, UserContext } from 'contexts/user';
import { ProjectsProvider } from 'contexts/projects';
import { BlocksProvider } from 'contexts/blocks';
// components
import AppDND from 'components/AppDND/container.js';

// --- components
export type Database = 'memory' | 'firebase';

type Props = {
  db: Database,
};

const App = (props: Props) => (
  <UserProvider>
    <UserContext.Consumer>
      {({ userProfile }) => {
        // get auto0 user id from user context (remove 'auth0|' prefix)
        const id = userProfile ? userProfile.sub.split('auth0|').pop() : null;
        return (
          <ProjectsProvider userId={id} db={props.db}>
            <BlocksProvider userId={id} db={props.db}>
              <AppDND />
            </BlocksProvider>
          </ProjectsProvider>
        );
      }}
    </UserContext.Consumer>
  </UserProvider>
);

export default App;
