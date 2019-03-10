// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
// components
import BlockButton from 'components/BlockButton';

// --- styled components
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

const RemoveButton = styled(BlockButton)`
  /* */
`;

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

// --- components
type Props = {
  id: string,
  label: string,
  title: string,
  desc: string,
  removeItem: (string) => void,
  setActiveItem: (string) => void,
};

type State = {
  infoShown: boolean,
};

class Item extends React.Component<Props, State> {
  state = {
    infoShown: false,
  };

  showInfo = () => {
    // only show info if description is set
    if (!this.props.desc) return;
    this.setState((prevState) => ({
      infoShown: true,
    }));
  };

  hideInfo = () => {
    this.setState((prevState) => ({
      infoShown: false,
    }));
  };

  render() {
    const {
      id,
      label,
      title,
      desc,
      removeItem,
      setActiveItem,
      ...props
    } = this.props;

    const { infoShown } = this.state;

    return (
      <Container
        {...props}
        // TODO: re-evaluate when to show and hide info
        // onMouseEnter={(ev) => this.showInfo()}
        // onMouseLeave={(ev) => this.hideInfo()}
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

          {infoShown && <Paragraph>{desc}</Paragraph>}
        </Text>
      </Container>
    );
  }
}

export default Item;
