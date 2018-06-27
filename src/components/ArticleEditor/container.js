import React from 'react';
// contexts
import { BlocksContext } from 'contexts/blocks';
// components
import ArticleEditor from './index.js';

const ArticleEditorContainer = (props) => (
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

export default ArticleEditorContainer;
