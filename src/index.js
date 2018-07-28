// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
// contexts
import { ProjectsProvider } from 'contexts/projects';
import { BlocksProvider } from 'contexts/blocks';
// components
import App from 'components/App';
import AppUI from 'components/AppUI';

const rootElement: any = document.getElementById('root');

ReactDOM.render(
  <App>
    <ProjectsProvider db="firebase">
      <BlocksProvider db="firebase">
        <AppUI />
      </BlocksProvider>
    </ProjectsProvider>
  </App>,
  rootElement,
);
unregister();
