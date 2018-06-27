// @flow

import React from 'react';
import styled from 'styled-components';
// components
import Field from 'components/Field';
import Block from 'components/Block/container.js';
import BlockButton from 'components/BlockButton';

// --- styled components
const ArticleField = styled(Field)`
  margin-top: 1rem;
  padding: 0;

  :first-child {
    margin-top: 0;
  }

  label {
    background-color: #ccbee4;
  }
`;

const AddButton = styled(BlockButton)`
  margin: 0.5rem auto 0;
`;

// --- components
type Props = {
  // context props
  blocks: Array<{
    time: number,
    title: string,
    desc: string,
    body: string,
  }>,
  addBlock: () => void,
  removeBlock: (number) => void,
};

const ArticleEditor = (props: Props) => (
  <React.Fragment>
    <ArticleField
      type="text"
      label="Article Title"
      text={'(title)'}
      updateText={(text) => true}
    />

    <ArticleField
      type="text"
      label="Article Description"
      text={'(description)'}
      updateText={(text) => true}
    />

    {props.blocks.map((block) => (
      <Block
        key={block.time}
        time={block.time}
        title={block.title}
        desc={block.desc}
        body={block.body}
        removeBlock={(createdAt) => props.removeBlock(createdAt)}
      />
    ))}

    <AddButton
      text="+"
      href=""
      onClick={(ev) => {
        ev.preventDefault();
        props.addBlock();
      }}
    />
  </React.Fragment>
);

export default ArticleEditor;
