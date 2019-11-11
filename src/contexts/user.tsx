import React from 'react';

const UserContext = React.createContext();

type Props = {
  children: React.ReactNode;
};

type Profile = {
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
};

function UserProvider({ children }: Props) {
  const [userProfile, setUserProfile] = React.useState(null);
  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export { Profile, UserContext, UserProvider };
