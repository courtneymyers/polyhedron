// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
// contexts
import { ProjectsProvider } from 'contexts/projects';
import { BlocksProvider } from 'contexts/blocks';
// components
import AppDND from 'components/AppDND';
import App from 'components/App';

const rootElement: any = document.getElementById('root');

ReactDOM.render(
  <AppDND>
    <ProjectsProvider db="firebase">
      <BlocksProvider db="firebase">
        <App />
      </BlocksProvider>
    </ProjectsProvider>
  </AppDND>,
  rootElement,
);
unregister();
