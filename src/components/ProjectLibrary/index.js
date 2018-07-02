// @flow

import React from 'react';
import styled from 'styled-components';
// components
import LibraryItem from 'components/LibraryItem';
// types
import type { ProjectProps } from 'contexts/projects';

// --- styled components
const Container = styled.div`
  /* */
`;

// --- components
type Props = {
  // context props
  projects: Array<ProjectProps>,
  removeProject: (string) => void,
};

const ProjectLibrary = (props: Props) => (
  <Container {...props}>
    {props.projects.map((project) => (
      <LibraryItem
        key={project.id}
        id={project.id}
        label="Project"
        title={project.title}
        desc={project.desc}
        removeItem={props.removeProject}
      />
    ))}
  </Container>
);

export default ProjectLibrary;
