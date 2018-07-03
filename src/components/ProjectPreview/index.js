// @flow

import React from 'react';
import styled from 'styled-components';
// types
import type { ProjectProps } from 'contexts/projects';
import type { BlockProps } from 'contexts/blocks';

// --- styled components
const Container = styled.div`
  background-color: white;
  padding: 1rem;

  p {
    margin-top: 1rem;
    margin-bottom: 0;
    line-height: 1.375;

    :first-of-type {
      margin-top: 0;
    }
  }
`;

// --- components
type Props = {
  // context props
  projects: Array<ProjectProps>,
  activeProjectId: string,
  blocks: Array<BlockProps>,
};

const ProjectPreview = (props: Props) => {
  const { projects, activeProjectId, blocks } = props;
  const project = projects.filter((p) => p.id === activeProjectId)[0];
  const projectBlocks = !project
    ? []
    : blocks.filter((block) => project.blockIds.indexOf(block.id) !== -1);

  return (
    <Container>
      {projectBlocks.map((block) => (
        <p key={block.id}>
          {/* TODO: update once we have block types */}
          {block.body}
        </p>
      ))}
    </Container>
  );
};

export default ProjectPreview;
