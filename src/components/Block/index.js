// @flow

import React from 'react';
import styled from 'styled-components';
// components
import BlockButton from 'components/BlockButton';
import Field from 'components/Field';
// types
import type { BlockProps } from 'contexts/blocks';

// --- styled components
const Container = styled.div`
  display: flex;
  margin-top: 1rem;
  border: 1px solid #ccbee4;
  border-radius: 3px;
`;

const Fields = styled.fieldset`
  order: 2;
  flex-grow: 1;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: #e2ddef;
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 1.75rem;
  background-color: #ccbee4;
  /* cursor: move; */
`;

const RemoveButton = styled(BlockButton)`
  /* */
`;

// --- components
type Props = {
  ...BlockProps,
  removeBlock: (string) => void,
  // context props
  updateBlockFieldText: (string, string, string) => void,
};

const Block = (props: Props) => (
  <Container {...props}>
    <Fields>
      {/* TODO: user, tags */}
      <Field
        type="text"
        label="Title"
        text={props.meta.title}
        updateText={(text) =>
          props.updateBlockFieldText(props.id, 'meta.title', text)
        }
      />

      <Field
        type="text"
        label="Description"
        text={props.meta.desc}
        updateText={(text) =>
          props.updateBlockFieldText(props.id, 'meta.desc', text)
        }
      />

      <Field
        type="textarea"
        label="Body"
        text={props.body}
        updateText={(text) =>
          props.updateBlockFieldText(props.id, 'body', text)
        }
      />
    </Fields>

    <Handle>
      <RemoveButton
        text="–"
        href=""
        title="Remove Block"
        onClick={(ev) => {
          ev.preventDefault();
          props.removeBlock(props.id);
        }}
      />
    </Handle>
  </Container>
);

export default Block;
