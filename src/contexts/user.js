// @flow

import React from 'react';
import type { Node } from 'react';

const UserContext: any = React.createContext();

type Props = {|
  children: Node,
|};

type Profile = {|
  name: string,
  nickname: string,
  picture: string,
  sub: string,
  updated_at: string,
|};

function UserProvider({ children }: Props) {
  const [userProfile, setUserProfile] = React.useState(null);
  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
export type { Profile };
