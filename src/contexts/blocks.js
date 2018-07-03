// @flow

import React from 'react';
// types
import type { Node } from 'react';
// databases
import firebase from 'databases/firebase.js';

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
  dbBlocks: Object; // firebase database reference
  addBlock: () => string;
  removeBlock: (string) => void;
  updateBlockFieldText: (string, string, string) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      blocks: [],
    };

    this.dbBlocks = firebase.database().ref('blocks');

    this.addBlock = () => {
      const currentTime = new Date().getTime();

      // add block to firebase -------------------------------------------------
      const newBlock = this.dbBlocks.push({
        time: currentTime,
        title: '',
        desc: '',
        body: '',
      });

      return newBlock.key;
      // -----------------------------------------------------------------------

      // this.setState((prevState) => ({
      //   blocks: prevState.blocks.concat({
      //     id: currentTime.toString(),
      //     time: currentTime,
      //     title: '',
      //     desc: '',
      //     body: '',
      //   }),
      // }));
      //
      // return currentTime.toString();
    };

    this.removeBlock = (blockId) => {
      // remove block from firebase --------------------------------------------
      const dbBlock = firebase.database().ref(`blocks/${blockId}`);
      dbBlock.remove();
      // -----------------------------------------------------------------------

      // this.setState((prevState) => ({
      //   blocks: prevState.blocks.filter((block) => block.id !== blockId),
      // }));
    };

    this.updateBlockFieldText = (blockId, fieldName, text) => {
      // update block field in firebase ----------------------------------------
      firebase
        .database()
        .ref(`blocks/${blockId}/${fieldName}`)
        .set(text);
      // -----------------------------------------------------------------------

      // this.setState((prevState) => {
      //   const blocks = [...prevState.blocks];
      //   blocks.filter((block) => block.id === blockId)[0][fieldName] = text;
      //   return {
      //     blocks: blocks,
      //   };
      // });
    };
  }

  componentDidMount() {
    // get blocks from firebase ------------------------------------------------
    this.dbBlocks.on('value', (snapshot) => {
      const blocks = snapshot.val();
      let updatedBlocks = [];
      for (let blockId in blocks) {
        // blockId is the key auto-generated by firebase
        updatedBlocks.push({
          id: blockId,
          time: blocks[blockId].time,
          title: blocks[blockId].title,
          desc: blocks[blockId].desc,
          body: blocks[blockId].body,
        });
      }

      this.setState((prevState) => ({
        blocks: updatedBlocks,
      }));
    });
    // -------------------------------------------------------------------------
  }

  render() {
    return (
      <BlocksContext.Provider
        value={{
          ...this.state,
          addBlock: this.addBlock,
          removeBlock: this.removeBlock,
          updateBlockFieldText: this.updateBlockFieldText,
        }}
      >
        {this.props.children}
      </BlocksContext.Provider>
    );
  }
}
