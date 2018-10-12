// @flow

import React from 'react';
import ReactDOM from 'react-dom';
// components
import App from 'components/App';

it('renders without crashing', () => {
  const rootElement: HTMLDivElement = document.createElement('div');

  ReactDOM.render(<App db="firebase" />, rootElement);
  ReactDOM.unmountComponentAtNode(rootElement);
});
