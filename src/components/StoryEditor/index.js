// @flow

import React from 'react';
import styled from 'styled-components';
// components
import ContentBlock from 'components/ContentBlock';
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
      this.setState((prevState) => {
        const newBlock = {
          time: new Date().getTime(),
          title: '',
          desc: '',
          body: '',
        };

        return {
          ...prevState,
          blocks: ++prevState.blocks,
          stories: prevState.stories.concat(newBlock),
        };
      });
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.stories.map((story) => (
          <ContentBlock
            key={story.time}
            time={story.time}
            title={story.title}
            desc={story.desc}
            body={story.body}
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
