// @flow

import React from 'react';
import styled from 'styled-components';
// components
import BlockButton from 'components/BlockButton';
import LibraryItem from 'components/LibraryItem';
// types
import type { ProjectProps } from 'contexts/projects';

// --- styled components
const Container = styled.div`
  /* */
`;

const AddButton = styled(BlockButton)`
  margin: 0.5rem auto 0;
`;

// --- components
type Props = {
  // context props
  projects: Array<ProjectProps>,
  activeProjectId: string,
  addProject: () => void,
  removeProject: (string) => void,
  setActiveProjectId: (string) => void,
};

const ProjectLibrary = (props: Props) => (
  <Container {...props}>
    {props.projects.map((project) => (
      <LibraryItem
        key={project.id}
        id={project.id}
        label="Project"
        title={project.meta.title}
        desc={project.meta.desc}
        removeItem={props.removeProject}
        setActiveItem={props.setActiveProjectId}
        style={{
          // active project gets highlighted border
          borderColor: project.id === props.activeProjectId && '#360a80',
        }}
      />
    ))}

    <AddButton
      text="+"
      href=""
      title="Add Project"
      onClick={(ev) => {
        ev.preventDefault();
        props.addProject();
      }}
    />
  </Container>
);

export default ProjectLibrary;
