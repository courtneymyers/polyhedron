import React from 'react';
// contexts
import { BlocksContext } from 'contexts/blocks';
// components
import BlockLibrary from './index.js';

const BlockLibraryContainer = (props) => (
  <BlocksContext.Consumer>
    {({ blocks, removeBlock }) => (
      <BlockLibrary {...props} blocks={blocks} removeBlock={removeBlock} />
    )}
  </BlocksContext.Consumer>
);

export default BlockLibraryContainer;
