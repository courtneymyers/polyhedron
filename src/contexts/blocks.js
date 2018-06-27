// @flow

import React from 'react';
// types
import type { Node } from 'react';

// --- contexts
export const BlocksContext = React.createContext();

// --- components
type Props = {
  children: Node,
};

type State = {
  blocks: Array<{
    time: number,
    title: string,
    desc: string,
    body: string,
  }>,
};

export class BlocksProvider extends React.Component<Props, State> {
  addBlock: () => void;
  removeBlock: (number) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      blocks: [
        {
          time: new Date().getTime(),
          title: '',
          desc: '',
          body: '',
        },
      ],
    };

    this.addBlock = () => {
      this.setState((prevState) => ({
        ...prevState,
        blocks: prevState.blocks.concat({
          time: new Date().getTime(),
          title: '',
          desc: '',
          body: '',
        }),
      }));
    };

    this.removeBlock = (createdAt) => {
      this.setState((prevState) => ({
        ...prevState,
        blocks: prevState.blocks.filter((block) => block.time !== createdAt),
      }));
    };
  }

  render() {
    return (
      <BlocksContext.Provider
        value={{
          ...this.state,
          addBlock: this.addBlock,
          removeBlock: this.removeBlock,
        }}
      >
        {this.props.children}
      </BlocksContext.Provider>
    );
  }
}
