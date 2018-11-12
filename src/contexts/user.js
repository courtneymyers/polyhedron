// @flow

import React from 'react';
// types
import type { Node } from 'react';

// --- contexts
export const UserContext = React.createContext();

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
|};

export class UserProvider extends React.Component<Props, State> {
  storeUserProfile: (profile: Profile) => void;

  constructor(props: Props) {
    super(props);
    this.state = { userProfile: null };

    this.storeUserProfile = (profile) => {
      this.setState({ userProfile: profile });
    };
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          storeUserProfile: this.storeUserProfile,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
