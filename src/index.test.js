// @flow

import React from 'react';
import ReactDOM from 'react-dom';
// components
import AppDND from 'components/AppDND';

it('renders without crashing', () => {
  const rootElement: any = document.createElement('div');
  ReactDOM.render(<AppDND />, rootElement);
  ReactDOM.unmountComponentAtNode(rootElement);
});
