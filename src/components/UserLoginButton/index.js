// @flow

import React from 'react';
// components
import BlockButton from 'components/BlockButton';
// authentication
import Auth from 'authentication/auth0.js';

// --- components
type Props = {};
type State = {
  profile: Object,
};

class UserLoginButton extends React.Component<Props, State> {
  auth: Object; // auth0 class instance
  login: () => void;
  logout: () => void;

  constructor(props: Props) {
    super(props);
    this.auth = new Auth();
    this.state = { profile: {} };

    this.login = () => {
      this.auth.login();
    };

    this.logout = () => {
      this.auth.logout();
      this.setState({ profile: {} });
    };
  }

  componentWillMount() {
    this.auth.getProfile((profile) => {
      if (profile === null) {
        this.setState({ profile: {} });
        return;
      }

      this.setState({ profile });
    });
  }

  render() {
    const { isAuthenticated } = this.auth;

    return (
      <BlockButton
        {...this.props}
        text={isAuthenticated() ? this.state.profile.name : 'Log In'}
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
