// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
// contexts
import { BlocksProvider } from 'contexts/blocks';
// components
import App from 'components/App';

const rootElement: any = document.getElementById('root');

ReactDOM.render(
  <BlocksProvider>
    <App />
  </BlocksProvider>,
  rootElement,
);
unregister();
