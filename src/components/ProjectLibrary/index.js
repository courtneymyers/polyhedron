// @flow

import React, { useContext } from 'react';
import styled from '@emotion/styled/macro';
// components
import BlockButton from 'components/BlockButton';
import LibraryItem from 'components/LibraryItem';
// contexts
import { ProjectsContext } from 'contexts/projects';

// --- styled components
const Container = styled.div`
  /* */
`;

const AddButton = styled(BlockButton)`
  margin: 0.5rem auto 0;
`;

// --- components
type Props = {};

const ProjectLibrary = ({ ...props }: Props) => {
  const {
    projects,
    activeProjectId,
    addProject,
    removeProject,
    setActiveProjectId,
  } = useContext(ProjectsContext);

  return (
    <Container {...props}>
      {projects.map((project) => (
        <LibraryItem
          key={project.id}
          id={project.id}
          label="Project"
          title={project.meta.title}
          desc={project.meta.desc}
          removeItem={removeProject}
          setActiveItem={setActiveProjectId}
          style={{
            // active project gets highlighted border
            borderColor: project.id === activeProjectId && '#360a80',
          }}
        />
      ))}

      <AddButton
        text="+"
        href=""
        title="Add Project"
        onClick={(ev) => {
          ev.preventDefault();
          addProject();
        }}
      />
    </Container>
  );
};

export default ProjectLibrary;
