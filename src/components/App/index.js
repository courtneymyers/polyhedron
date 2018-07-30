// @flow

import React from 'react';
// contexts
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
  <ProjectsProvider db={props.db}>
    <BlocksProvider db={props.db}>
      <AppDND />
    </BlocksProvider>
  </ProjectsProvider>
);

export default App;
