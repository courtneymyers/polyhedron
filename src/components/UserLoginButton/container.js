import React from 'react';
// contexts
import { UserContext } from 'contexts/user';
// components
import UserLoginButton from './index.js';

const UserLoginButtonContainer = (props) => (
  <UserContext.Consumer>
    {({ userProfile, storeUserProfile }) => (
      <UserLoginButton
        {...props}
        userProfile={userProfile}
        storeUserProfile={storeUserProfile}
      />
    )}
  </UserContext.Consumer>
);

export default UserLoginButtonContainer;
