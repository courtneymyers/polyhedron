// @flow

import React from 'react';
// components
import BlockButton from 'components/BlockButton';
// contexts
import { UserContext } from 'contexts/user';
// authentication
import AuthClient from 'config/auth0-auth';

type Props = {};
type State = {};

class UserLoginButton extends React.Component<Props, State> {
  static contextType = UserContext;

  auth = new AuthClient();

  login = () => {
    this.auth.login();
  };

  logout = () => {
    this.auth.logout();
    this.context.storeUserProfile(null);
  };

  render() {
    const { ...props } = this.props;
    const { isAuthenticated } = this.auth;
    const userName = this.context.userProfile
      ? this.context.userProfile.name
      : '';

    return (
      <BlockButton
        {...props}
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
