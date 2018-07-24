// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
// contexts
import { ProjectsProvider } from 'contexts/projects';
import { BlocksProvider } from 'contexts/blocks';
// components
import AppDND from 'components/AppDND';

const rootElement: any = document.getElementById('root');

ReactDOM.render(
  <ProjectsProvider db="memory">
    <BlocksProvider db="memory">
      <AppDND />
    </BlocksProvider>
  </ProjectsProvider>,
  rootElement,
);
unregister();
