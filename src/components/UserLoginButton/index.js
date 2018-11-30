// @flow

import React from 'react';
// components
import BlockButton from 'components/BlockButton';
// contexts
import { UserContext } from 'contexts/user';
// authentication
import AuthClient from 'authentication/auth0-auth.js';

// --- components
type Props = {};
type State = {};

class UserLoginButton extends React.Component<Props, State> {
  auth: Object; // auth0 class instance
  login: () => void;
  logout: () => void;

  static contextType = UserContext;

  constructor(props: Props) {
    super(props);
    this.auth = new AuthClient();

    this.login = () => {
      this.auth.login();
    };

    this.logout = () => {
      this.auth.logout();
      this.context.storeUserProfile(null);
    };
  }

  render() {
    const { isAuthenticated } = this.auth;
    const userName = this.context.userProfile
      ? this.context.userProfile.name
      : '';

    return (
      <BlockButton
        {...this.props}
        text={isAuthenticated() ? userName : 'Log In'}
        href="#user"
        title="User Menu"
        onClick={(ev) => {
          ev.preventDefault();
          isAuthenticated() ? this.logout() : this.login();
        }}
      />
    );
  }
}

export default UserLoginButton;
