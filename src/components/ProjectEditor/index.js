// @flow

import React from 'react';
import styled from 'styled-components';
// components
import Field from 'components/Field';
import Block from 'components/Block/container.js';
import BlockButton from 'components/BlockButton';
// types
import type { ProjectProps } from 'contexts/projects';
import type { BlockProps } from 'contexts/blocks';

// --- styled components
const ProjectField = styled(Field)`
  margin-top: 1rem;
  padding: 0;

  :first-child {
    margin-top: 0;
  }

  label {
    background-color: #ccbee4;
  }
`;

const Heading = styled.h3`
  margin-top: 1rem;
  margin-bottom: 0;
  border-bottom: 1px solid #ccbee4;
  font-size: 0.9325rem;
  color: #360a80;
`;

const AddButton = styled(BlockButton)`
  margin: 0.5rem auto 0;
`;

// --- components
type Props = {
  // context props
  projects: Array<ProjectProps>,
  addProject: () => void,
  blocks: Array<BlockProps>,
  addBlock: () => void,
  removeBlock: (string) => void,
};

const ProjectEditor = (props: Props) => (
  <React.Fragment>
    {props.projects.length === 0 ? (
      <React.Fragment>
        <p>No projects exist. Create a new one!</p>
        <AddButton
          text="+"
          href=""
          title="Add Project"
          onClick={(ev) => {
            ev.preventDefault();
            props.addProject();
          }}
        />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <ProjectField
          type="text"
          label="Project Title"
          text={'(title)'}
          updateText={(text) => true}
        />

        <ProjectField
          type="text"
          label="Project Description"
          text={'(description)'}
          updateText={(text) => true}
        />

        <Heading>Blocks</Heading>

        {props.blocks.map((block) => (
          <Block
            key={block.id}
            id={block.id}
            time={block.time}
            title={block.title}
            desc={block.desc}
            body={block.body}
            removeBlock={(blockId) => props.removeBlock(blockId)}
          />
        ))}

        <AddButton
          text="+"
          href=""
          title="Add Block"
          onClick={(ev) => {
            ev.preventDefault();
            props.addBlock();
          }}
        />
      </React.Fragment>
    )}
  </React.Fragment>
);

export default ProjectEditor;
