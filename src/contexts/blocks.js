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
  updateFieldText: (number, string, string) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      blocks: [],
    };

    this.addBlock = () => {
      this.setState((prevState) => ({
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
        blocks: prevState.blocks.filter((block) => block.time !== createdAt),
      }));
    };

    this.updateFieldText = (createdAt, fieldName, text) => {
      this.setState((prevState) => {
        const blocks = [...prevState.blocks];
        blocks.filter((block) => block.time === createdAt)[0][fieldName] = text;
        return {
          blocks: blocks,
        };
      });
    };
  }

  render() {
    return (
      <BlocksContext.Provider
        value={{
          ...this.state,
          addBlock: this.addBlock,
          removeBlock: this.removeBlock,
          updateFieldText: this.updateFieldText,
        }}
      >
        {this.props.children}
      </BlocksContext.Provider>
    );
  }
}
