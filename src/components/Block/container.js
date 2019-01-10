import React from 'react';
// contexts
import { BlocksContext } from 'contexts/blocks';
// components
import Block from './index.js';

const BlockContainer = ({ ...props }) => (
  <BlocksContext.Consumer>
    {({ updateBlockFieldText }) => (
      <Block {...props} updateBlockFieldText={updateBlockFieldText} />
    )}
  </BlocksContext.Consumer>
);

export default BlockContainer;
