// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
// components
import App from 'components/App';

const rootElement: HTMLElement = document.getElementById('root');

ReactDOM.render(<App db="firebase" />, rootElement);
unregister();
