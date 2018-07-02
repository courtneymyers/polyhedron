// @flow

import React from 'react';
import styled from 'styled-components';
// components
import BlockButton from 'components/BlockButton';

// --- styled components
const Container = styled.div`
  display: flex;
  margin-top: 0.5rem;
  border: 1px solid #ccbee4;
  border-radius: 3px;
  background-color: white;
`;

const Handle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background-color: #ccbee4;
`;

const RemoveButton = styled(BlockButton)`
  /* */
`;

const TextContent = styled.div`
  flex-grow: 1;
  padding: 0.5rem;
  user-select: none;
  cursor: move;
`;

const Paragraph = styled.p`
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-size: 0.875rem;

  :first-of-type {
    margin-top: 0;
  }
`;

const Title = Paragraph.extend`
  font-weight: bold;
  color: #360a80;
`;

// --- components
type TextProps = {
  title: string,
  desc: string,
};

type TextState = {
  infoShown: boolean,
};

class Text extends React.Component<TextProps, TextState> {
  showInfo: () => void;
  hideInfo: () => void;

  constructor(props: TextProps) {
    super(props);
    this.state = {
      infoShown: false,
    };

    this.showInfo = () => {
      // only show info if description is set
      if (!this.props.desc) return;
      this.setState((prevState) => ({
        infoShown: true,
      }));
    };

    this.hideInfo = () => {
      this.setState((prevState) => ({
        infoShown: false,
      }));
    };
  }

  render() {
    return (
      <TextContent
        onMouseEnter={(ev) => this.showInfo()}
        onMouseLeave={(ev) => this.hideInfo()}
      >
        <Title>{this.props.title === '' ? '\u00A0' : this.props.title}</Title>

        {this.state.infoShown && <Paragraph>{this.props.desc}</Paragraph>}
      </TextContent>
    );
  }
}

type Props = {
  id: string,
  label: string,
  title: string,
  desc: string,
  removeItem: (string) => void,
};

const Item = (props: Props) => (
  <Container>
    <Handle>
      <RemoveButton
        text="–"
        href=""
        title={`Remove ${props.label}`}
        onClick={(ev) => {
          ev.preventDefault();
          props.removeItem(props.id);
        }}
      />
    </Handle>
    <Text title={props.title} desc={props.desc} />
  </Container>
);

export default Item;
