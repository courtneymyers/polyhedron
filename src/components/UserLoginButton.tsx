import React from 'react';
// components
import BlockButton from 'components/BlockButton';
// contexts
import { useUserContext } from 'contexts/user';
// authentication
import AuthClient from 'config/auth0-auth';

type Props = {};

function UserLoginButton({ ...props }: Props) {
  const { userProfile, setUserProfile } = useUserContext();

  const auth = new AuthClient();
  const userName = userProfile ? userProfile.name : '';

  function login() {
    auth.login();
  }

  function logout() {
    auth.logout();
    setUserProfile(null);
  }

  return (
    <BlockButton
      {...props}
      text={auth.isAuthenticated() ? userName : 'Log In'}
      href="#user"
      title="User Menu"
      onClick={(ev) => {
        ev.preventDefault();
        auth.isAuthenticated() ? logout() : login();
      }}
    />
  );
}

export default UserLoginButton;
