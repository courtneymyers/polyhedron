// @flow

import React from 'react';
import styled from 'styled-components';
// components
import Block from 'components/Block';
import BlockButton from 'components/BlockButton';

// --- styled components
const AddButton = styled(BlockButton)`
  margin: 0.5rem auto 0;
`;

// --- components
type Props = {};

type State = {
  blocks: Array<{
    time: number,
    title: string,
    desc: string,
    body: string,
  }>,
};

class ArticleEditor extends React.Component<Props, State> {
  addBlock: () => void;
  removeBlock: (number) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      blocks: [
        {
          time: new Date().getTime(),
          title: '',
          desc: '',
          body: '',
        },
      ],
    };

    this.addBlock = () => {
      this.setState((prevState) => ({
        ...prevState,
        blocks: prevState.blocks.concat({
          time: new Date().getTime(),
          title: '',
          desc: '',
          body: '',
        }),
      }));
    };

    this.removeBlock = (createdAt) => {
      this.setState((prevState) => ({
        ...prevState,
        blocks: prevState.blocks.filter((block) => block.time !== createdAt),
      }));
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.blocks.map((block) => (
          <Block
            key={block.time}
            time={block.time}
            title={block.title}
            desc={block.desc}
            body={block.body}
            removeBlock={(createdAt) => this.removeBlock(createdAt)}
          />
        ))}

        <AddButton
          text="+"
          href=""
          onClick={(ev) => {
            ev.preventDefault();
            this.addBlock();
          }}
        />
      </React.Fragment>
    );
  }
}

export default ArticleEditor;
