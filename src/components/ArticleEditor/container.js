import React from 'react';
// contexts
import { BlocksContext } from 'contexts/blocks';
// components
import ArticleEditor from './index.js';

export default (props) => (
  <BlocksContext.Consumer>
    {({ blocks, addBlock, removeBlock }) => (
      <ArticleEditor
        {...props}
        blocks={blocks}
        addBlock={addBlock}
        removeBlock={removeBlock}
      />
    )}
  </BlocksContext.Consumer>
);
