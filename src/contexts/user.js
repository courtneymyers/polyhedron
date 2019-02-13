// @flow

import React from 'react';
// types
import type { Node } from 'react';

// --- contexts
export const UserContext: any = React.createContext();

// --- components
type Props = {|
  children: Node,
|};

export type Profile = {|
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

export class UserProvider extends React.Component<Props, State> {
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
