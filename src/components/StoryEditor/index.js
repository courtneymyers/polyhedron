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

type Story = {
  time: number,
  title: string,
  desc: string,
  body: string,
};

type State = {
  blocks: number,
  stories: Array<Story>,
};

class StoryEditor extends React.Component<Props, State> {
  addBlock: () => void;
  removeBlock: (number) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      blocks: 1,
      stories: [
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
        blocks: ++prevState.blocks,
        stories: prevState.stories.concat({
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
        blocks: --prevState.blocks,
        stories: prevState.stories.filter((block) => block.time !== createdAt),
      }));
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.stories.map((story) => (
          <Block
            key={story.time}
            time={story.time}
            title={story.title}
            desc={story.desc}
            body={story.body}
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

export default StoryEditor;
