import React from 'react';
import { Auth0UserProfile } from 'auth0-js';

type Props = {
  children: React.ReactNode;
};

type Context = {
  userProfile: Auth0UserProfile | null;
  setUserProfile(profile: Auth0UserProfile | null): void;
};

const UserContext = React.createContext<Context | undefined>(undefined);

function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

function UserProvider({ children }: Props) {
  const [userProfile, setUserProfile] = React.useState<Auth0UserProfile | null>(
    null,
  );

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, useUserContext };
