// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
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
    font-size: 1rem;
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

const ProjectPreview = ({
  projects,
  activeProjectId,
  blocks,
  ...props
}: Props) => {
  // TODO: abstract the following 7 lines, as its also used in ProjectEditor
  const project = projects.filter((p) => p.id === activeProjectId)[0];
  const projectBlocks = !project
    ? []
    : project.blockIds.map(
        (blockId) => blocks.filter((block) => block.id === blockId)[0],
      );

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
