import React from 'react';
import styled from '@emotion/styled/macro';
// components
import BlockButton from 'components/BlockButton';
import LibraryItem from 'components/LibraryItem';
// contexts
import { useProjectsContext } from 'contexts/projects';

const Container = styled.div``;

const Item = styled(LibraryItem)<{ isActive: boolean }>`
  border-color: ${({ isActive }) => isActive && '#360a80'};
`;

const AddButton = styled(BlockButton)`
  margin: 0.5rem auto 0;
`;

type Props = {};

function ProjectLibrary({ ...props }: Props) {
  const {
    projects,
    activeProjectId,
    addProject,
    removeProject,
    assignActiveProjectId,
  } = useProjectsContext();

  return (
    <Container>
      {projects.map((project) => (
        <Item
          key={project.id}
          id={project.id}
          label="Project"
          title={project.meta.title}
          desc={project.meta.desc}
          removeItem={removeProject}
          setActiveItem={assignActiveProjectId}
          // active project gets highlighted border
          isActive={project.id === activeProjectId}
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
}

export default ProjectLibrary;
