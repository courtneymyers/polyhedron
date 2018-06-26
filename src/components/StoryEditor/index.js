// @flow

import React from 'react';
import styled from 'styled-components';
// components
import ContentBlock from 'components/ContentBlock';

// --- styled components
const Container = styled.div`
  /* */
`;

const AddButton = styled.a`
  display: block;
  margin: 0.5rem auto 0;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 3px;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: bold;
  color: #fff;
  background-color: #360a80;
  text-align: center;
  text-decoration: none;

  :hover,
  :focus {
    background-color: #360ccc;
  }
`;

// --- components
type Props = {};

type Story = {
  id: number,
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
          id: 1,
          title: '',
          desc: '',
          body: '',
        },
      ],
    };

    this.addBlock = () => {
      this.setState((prevState) => {
        const newBlock = {
          id: ++prevState.blocks,
          title: '',
          desc: '',
          body: '',
        };

        return {
          ...prevState,
          blocks: newBlock.id,
          stories: prevState.stories.concat(newBlock),
        };
      });
    };
  }

  render() {
    return (
      <Container {...this.props}>
        {this.state.stories.map((story) => (
          <ContentBlock
            key={story.id}
            id={story.id}
            title={story.title}
            desc={story.desc}
            body={story.body}
          />
        ))}

        <AddButton
          href=""
          onClick={(ev) => {
            ev.preventDefault();
            this.addBlock();
          }}
        >
          +
        </AddButton>
      </Container>
    );
  }
}

export default StoryEditor;
