// @flow

import React from 'react';
// components
import BlockButton from 'components/BlockButton';
// authentication
import Auth from 'authentication/auth0.js';
// types
import type { Profile } from 'contexts/user';

// --- components
type Props = {
  // context props
  userProfile: Profile,
  storeUserProfile: (Profile) => void,
};

type State = {};

class UserLoginButton extends React.Component<Props, State> {
  auth: Object; // auth0 class instance
  login: () => void;
  logout: () => void;

  constructor(props: Props) {
    super(props);
    this.auth = new Auth();

    this.login = () => {
      this.auth.login();
    };

    this.logout = () => {
      this.auth.logout();
      this.props.storeUserProfile(null);
    };
  }

  componentWillMount() {
    this.auth.getProfile((profile) => {
      this.props.storeUserProfile(profile);
    });
  }

  render() {
    const { isAuthenticated } = this.auth;
    const userName = this.props.userProfile ? this.props.userProfile.name : '';

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
