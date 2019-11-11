import React from 'react';
import styled from '@emotion/styled/macro';
// contexts
import { ProjectsContext } from 'contexts/projects';
import { BlocksContext } from 'contexts/blocks';

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

type Props = {};

function ProjectPreview({ ...props }: Props) {
  const { projects, activeProjectId } = React.useContext(ProjectsContext);
  const { blocks } = React.useContext(BlocksContext);

  // TODO: abstract the following 7 lines, as its also used in ProjectEditor
  const project = projects.filter((p) => p.id === activeProjectId)[0];
  const projectBlocks =
    !project || blocks.length === 0
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
}

export default ProjectPreview;
