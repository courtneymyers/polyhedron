// @flow

import React from 'react';
import styled from 'styled-components';
// components
import BlockButton from 'components/BlockButton';

// --- styled components
const Container = styled.div`
  /* */
`;

const RemoveButton = styled(BlockButton)`
  /* */
`;

const Block = styled.div`
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
  flex-basis: 1.75rem;
  background-color: #ccbee4;
`;

const Text = styled.div`
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
class BlockText extends React.Component<
  { title: string, desc: string },
  { infoShown: boolean },
> {
  showInfo: () => void;
  hideInfo: () => void;

  constructor(props: Props) {
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
      <Text
        onMouseEnter={(ev) => this.showInfo()}
        onMouseLeave={(ev) => this.hideInfo()}
      >
        <Title>{this.props.title === '' ? '\u00A0' : this.props.title}</Title>

        {this.state.infoShown && <Paragraph>{this.props.desc}</Paragraph>}
      </Text>
    );
  }
}

type Props = {
  // context props
  blocks: Array<{
    time: number,
    title: string,
    desc: string,
    body: string,
  }>,
  removeBlock: (number) => void,
};

const BlockLibrary = (props: Props) => (
  <Container {...this.props}>
    {props.blocks.map((block) => (
      <Block key={block.time}>
        <Handle>
          <RemoveButton
            text="–"
            href=""
            onClick={(ev) => {
              ev.preventDefault();
              props.removeBlock(block.time);
            }}
          />
        </Handle>
        <BlockText title={block.title} desc={block.desc} />
      </Block>
    ))}
  </Container>
);

export default BlockLibrary;
