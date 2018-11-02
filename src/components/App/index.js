// @flow

import React from 'react';
// contexts
import { ProjectsProvider } from 'contexts/projects';
import { BlocksProvider } from 'contexts/blocks';
// components
import AppDND from 'components/AppDND/container.js';
// authentication
import Auth from 'authentication/auth0.js';
// types
import type { Profile } from 'contexts/user';

// --- components
export type Database = 'memory' | 'firebase';

type Props = {
  db: Database,
  // context props
  userId: string,
  storeUserProfile: (Profile) => void,
};

type State = {};

class App extends React.Component<Props, State> {
  auth: Object; // auth0 class instance

  constructor(props: Props) {
    super(props);
    this.auth = new Auth();
  }

  componentWillMount() {
    this.auth.getProfile((profile) => {
      this.props.storeUserProfile(profile);
    });
  }

  render() {
    const { userId, db } = this.props;
    return userId ? (
      <ProjectsProvider userId={userId} db={db}>
        <BlocksProvider userId={userId} db={db}>
          <AppDND />
        </BlocksProvider>
      </ProjectsProvider>
    ) : (
      <p>[Login screen]</p>
    );
  }
}

export default App;
