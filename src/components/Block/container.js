import React from 'react';
// contexts
import { BlocksContext } from 'contexts/blocks';
// components
import Block from './index.js';

const BlockContainer = (props) => (
  <BlocksContext.Consumer>
    {({ updateFieldText }) => {
      return <Block {...props} updateFieldText={updateFieldText} />;
    }}
  </BlocksContext.Consumer>
);

export default BlockContainer;
