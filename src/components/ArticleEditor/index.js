// @flow

import React from 'react';
import styled from 'styled-components';
// components
import Block from 'components/Block';
import BlockButton from 'components/BlockButton';

// --- styled components
const AddButton = styled(BlockButton)`
  margin: 0.5rem auto 0;
`;

// --- components
type Props = {
  blocks: Array<{
    time: number,
    title: string,
    desc: string,
    body: string,
  }>,
  addBlock: () => void,
  removeBlock: (number) => void,
};

type State = {};

class ArticleEditor extends React.Component<Props, State> {
  render() {
    return (
      <React.Fragment>
        {this.props.blocks.map((block) => (
          <Block
            key={block.time}
            time={block.time}
            title={block.title}
            desc={block.desc}
            body={block.body}
            removeBlock={(createdAt) => this.props.removeBlock(createdAt)}
          />
        ))}

        <AddButton
          text="+"
          href=""
          onClick={(ev) => {
            ev.preventDefault();
            this.props.addBlock();
          }}
        />
      </React.Fragment>
    );
  }
}

export default ArticleEditor;
