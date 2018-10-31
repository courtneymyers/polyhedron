// @flow

import React from 'react';
// contexts
import { UserProvider } from 'contexts/user';
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
    <ProjectsProvider db={props.db}>
      <BlocksProvider db={props.db}>
        <AppDND />
      </BlocksProvider>
    </ProjectsProvider>
  </UserProvider>
);

export default App;
