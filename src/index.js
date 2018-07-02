// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
// contexts
import { ProjectsProvider } from 'contexts/projects';
import { BlocksProvider } from 'contexts/blocks';
// components
import App from 'components/App';

const rootElement: any = document.getElementById('root');

ReactDOM.render(
  <ProjectsProvider>
    <BlocksProvider>
      <App />
    </BlocksProvider>
  </ProjectsProvider>,
  rootElement,
);
unregister();
