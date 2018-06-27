// @flow

import React from 'react';
// types
import type { Node } from 'react';

// --- contexts
export const ArticlesContext = React.createContext();

// --- components
type Props = {
  children: Node,
};

type State = {
  articles: Array<{
    time: number,
    title: string,
    desc: string,
    blocks: Array<{
      time: number,
      title: string,
      desc: string,
      body: string,
    }>,
  }>,
};

export class ArticlesProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  render() {
    return (
      <ArticlesContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </ArticlesContext.Provider>
    );
  }
}
