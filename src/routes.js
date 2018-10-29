// @flow

import React from 'react';
import { Router } from '@reach/router';
// components
import App from 'components/App';
import AuthCallback from 'components/AuthCallback';

export const setupRoutes = () => (
  <Router>
    <App path="/" db="firebase" />
    <AuthCallback path="auth" />
  </Router>
);
