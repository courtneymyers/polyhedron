import React from 'react';
import styled from '@emotion/styled/macro';
// components
import BlockButton from 'components/BlockButton';

const Container = styled.div`
  display: flex;
  border: 3px solid #e2ddef;
  border-radius: 3px;
  background-color: white;
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3125rem;
  padding-right: 0.25rem;
  background-color: #ccbee4;
`;

const RemoveButton = styled(BlockButton)``;

const Text = styled.div`
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccbee4;
  user-select: none;
  /* cursor: move; */
`;

const Paragraph = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 0.875rem;

  :first-of-type {
    margin-top: 0;
  }
`;

const Title = styled(Paragraph)`
  font-weight: bold;
  color: #360a80;
`;

type Props = {
  id: string;
  label: string;
  title: string;
  desc: string;
  removeItem: (id: string) => void;
  setActiveItem: (id: string) => void;
};

function LibraryItem({
  id,
  label,
  title,
  desc,
  removeItem,
  setActiveItem,
  ...props
}: Props) {
  // const [infoShown, setInfoShown] = React.useState(false);

  return (
    <Container
      {...props}
      // TODO: re-evaluate when to show and hide info
      // // only show info if description is set
      // onMouseEnter={(ev) => desc && setInfoShown(true)}
      // onMouseLeave={(ev) => setInfoShown(false)}
      onClick={(ev) => setActiveItem(id)}
    >
      <Handle>
        <RemoveButton
          text="–"
          href=""
          title={`Remove ${label}`}
          onClick={(ev) => {
            ev.preventDefault();
            removeItem(id);
          }}
        />
      </Handle>
      <Text>
        <Title>{title === '' ? '\u00A0' : title}</Title>
        {/* {infoShown && <Paragraph>{desc}</Paragraph>} */}
      </Text>
    </Container>
  );
}

export default LibraryItem;
