import React from 'react';
import styled from '@emotion/styled/macro';
// components
import BlockButton from 'components/BlockButton';
import Field from 'components/Field';
// contexts
import { BlockProps, useBlocksContext } from 'contexts/blocks';

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

const RemoveButton = styled(BlockButton)``;

type Props = {
  removeBlock: (blockId: string) => void;
};

function Block({
  id,
  meta,
  type,
  body,
  removeBlock,
  ...props
}: Props & BlockProps) {
  const { updateBlockFieldText } = useBlocksContext();

  return (
    <Container {...props}>
      <Fields>
        {/* TODO: user, tags */}
        <Field
          type="text"
          label="Title"
          text={meta.title}
          updateText={(text) => updateBlockFieldText(id, 'meta.title', text)}
        />

        <Field
          type="text"
          label="Description"
          text={meta.desc}
          updateText={(text) => updateBlockFieldText(id, 'meta.desc', text)}
        />

        {type === 'plainText' && (
          <Field
            type="textarea"
            label="Body"
            text={body}
            updateText={(text) => updateBlockFieldText(id, 'body', text)}
          />
        )}
      </Fields>

      <Handle>
        <RemoveButton
          text="–"
          href=""
          title="Remove Block"
          onClick={(ev) => {
            ev.preventDefault();
            removeBlock(id);
          }}
        />
      </Handle>
    </Container>
  );
}

export default Block;
