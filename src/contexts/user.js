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

type State = {|
  userProfile: ?Profile,
  storeUserProfile: (profile: Profile) => void,
|};

class UserProvider extends React.Component<Props, State> {
  state: State = {
    userProfile: null,
    storeUserProfile: (profile) => {
      return this.storeUserProfile(profile);
    },
  };

  storeUserProfile = (profile: Profile) => {
    this.setState({ userProfile: profile });
    return;
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserContext, UserProvider };
export type { Profile };
