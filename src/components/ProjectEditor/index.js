// @flow

import React from 'react';
import styled from '@emotion/styled/macro';
// components
import Field from 'components/Field';
import ProjectBlocks from 'components/ProjectBlocks';
import BlockButton from 'components/BlockButton';
// types
import type { ProjectProps } from 'contexts/projects';
import type { BlockProps } from 'contexts/blocks';

// --- styled components
const ProjectField = styled(Field)`
  margin: 1rem 0 0;

  :first-of-type {
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
  activeProjectId: string,
  updateProjectFieldText: (string, string, string) => void,
  addBlockIdToProject: (string, string, ?number) => void,
  blocks: Array<BlockProps>,
  addBlock: () => string,
};

const ProjectEditor = ({
  projects,
  activeProjectId,
  updateProjectFieldText,
  addBlockIdToProject,
  blocks,
  addBlock,
  ...props
}: Props) => {
  // TODO: abstract the following 7 lines, as its also used in ProjectPreview
  const project = projects.filter((p) => p.id === activeProjectId)[0];
  const projectBlocks = !project
    ? []
    : project.blockIds.map(
        (blockId) => blocks.filter((block) => block.id === blockId)[0],
      );

  return (
    <>
      {!project ? (
        <p>No project selected. Select a project or create a new one!</p>
      ) : (
        <>
          <ProjectField
            type="text"
            label="Project Title"
            text={project.meta.title}
            updateText={(text) =>
              updateProjectFieldText(project.id, 'meta.title', text)
            }
          />

          <ProjectField
            type="text"
            label="Project Description"
            text={project.meta.desc}
            updateText={(text) =>
              updateProjectFieldText(project.id, 'meta.desc', text)
            }
          />

          <Heading>Blocks</Heading>

          <ProjectBlocks blocks={projectBlocks} projectId={project.id} />

          <AddButton
            text="+"
            href=""
            title="Add Block"
            onClick={(ev) => {
              ev.preventDefault();
              const blockId = addBlock();
              if (blockId) addBlockIdToProject(project.id, blockId);
            }}
          />
        </>
      )}
    </>
  );
};

export default ProjectEditor;
