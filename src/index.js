// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
// components
import Routes from './routes';

const rootElement: any = document.getElementById('root');

ReactDOM.render(<Routes />, rootElement);
unregister();
