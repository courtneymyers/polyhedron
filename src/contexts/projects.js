// @flow

import React from 'react';
// types
import type { Node } from 'react';
import type { BlockProps } from 'contexts/blocks';

// --- contexts
export const ProjectsContext = React.createContext();

// --- components
type Props = {
  children: Node,
};

export type ProjectProps = {|
  id: string,
  time: number,
  title: string,
  desc: string,
  blocks: Array<BlockProps>,
|};

type State = {
  projects: Array<ProjectProps>,
  activeProjectId: string,
};

export class ProjectsProvider extends React.Component<Props, State> {
  addProject: () => void;
  removeProject: (string) => void;
  setActiveProjectId: (string) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      projects: [],
      activeProjectId: '',
    };

    this.addProject = () => {
      const currentTime = new Date().getTime();

      this.setState((prevState) => ({
        projects: prevState.projects.concat({
          id: currentTime.toString(),
          time: currentTime,
          title: '',
          desc: '',
          blocks: [
            {
              id: currentTime.toString(),
              time: currentTime,
              title: '',
              desc: '',
              body: '',
            },
          ],
        }),
      }));
    };

    this.removeProject = (projectId) => {
      this.setState((prevState) => ({
        projects: prevState.projects.filter(
          (project) => project.id !== projectId,
        ),
      }));
    };

    this.setActiveProjectId = (projectId) => {
      this.setState((prevState) => ({
        activeProjectId: projectId,
      }));
    };
  }

  render() {
    return (
      <ProjectsContext.Provider
        value={{
          ...this.state,
          addProject: this.addProject,
          removeProject: this.removeProject,
          setActiveProjectId: this.setActiveProjectId,
        }}
      >
        {this.props.children}
      </ProjectsContext.Provider>
    );
  }
}
