// @flow

import React from 'react';
import ReactDOM from 'react-dom';
// components
import Routes from './routes';

it('renders without crashing', () => {
  const rootElement: HTMLDivElement = document.createElement('div');

  ReactDOM.render(<Routes />, rootElement);
  ReactDOM.unmountComponentAtNode(rootElement);
});
