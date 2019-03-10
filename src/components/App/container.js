import React from 'react';
// contexts
import { UserProvider, UserContext } from 'contexts/user';
// components
import App from './index.js';

function AppContainer({ ...props }) {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ userProfile, storeUserProfile }) => {
          // remove 'auth0|' prefix to set userId
          const userId = userProfile
            ? userProfile.sub.split('auth0|').pop()
            : null;

          return (
            <App
              {...props}
              userId={userId}
              storeUserProfile={storeUserProfile}
            />
          );
        }}
      </UserContext.Consumer>
    </UserProvider>
  );
}

export default AppContainer;
