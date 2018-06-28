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

export type BlockProps = {|
  id: string,
  time: number,
  title: string,
  desc: string,
  body: string,
|};

type State = {
  blocks: Array<BlockProps>,
};

export class BlocksProvider extends React.Component<Props, State> {
  addBlock: () => void;
  removeBlock: (string) => void;
  updateFieldText: (string, string, string) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      blocks: [],
    };

    this.addBlock = () => {
      this.setState((prevState) => {
        const currentTime = new Date().getTime();
        return {
          blocks: prevState.blocks.concat({
            id: currentTime.toString(),
            time: currentTime,
            title: '',
            desc: '',
            body: '',
          }),
        };
      });
    };

    this.removeBlock = (blockId) => {
      this.setState((prevState) => ({
        blocks: prevState.blocks.filter((block) => block.id !== blockId),
      }));
    };

    this.updateFieldText = (blockId, fieldName, text) => {
      this.setState((prevState) => {
        const blocks = [...prevState.blocks];
        blocks.filter((block) => block.id === blockId)[0][fieldName] = text;
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
