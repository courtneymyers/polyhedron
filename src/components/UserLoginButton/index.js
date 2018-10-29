// @flow

import React from 'react';
// components
import BlockButton from 'components/BlockButton';
// authentication
import Auth from 'authentication/auth0.js';

// --- components
type Props = {};
type State = {};

class UserLoginButton extends React.Component<Props, State> {
  auth: Object; // auth0 class instance

  constructor(props: Props) {
    super(props);
    this.auth = new Auth();
  }

  render() {
    const { isAuthenticated, login, logout } = this.auth;

    return (
      <BlockButton
        {...this.props}
        text={isAuthenticated() ? 'Log Out' : 'Log In'}
        href="#user"
        title="User Menu"
        onClick={(ev) => {
          ev.preventDefault();
          isAuthenticated() ? logout() : login();
        }}
      />
    );
  }
}

export default UserLoginButton;
