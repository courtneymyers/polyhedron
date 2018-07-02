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
};

export class ProjectsProvider extends React.Component<Props, State> {
  addProject: () => void;
  removeProject: (string) => void;

  constructor(props: Props) {
    super(props);

    /* ---------------------------------------------------------------------- */
    /* temporary */
    /* ---------------------------------------------------------------------- */
    const currentTime = new Date().getTime();
    /* ---------------------------------------------------------------------- */
    /* temporary */
    /* ---------------------------------------------------------------------- */

    this.state = {
      // projects: [],
      /* -------------------------------------------------------------------- */
      /* temporary */
      /* -------------------------------------------------------------------- */
      projects: [
        {
          id: currentTime.toString(),
          time: currentTime,
          title: '(title)',
          desc: '(description)',
          blocks: [
            {
              id: currentTime.toString(),
              time: currentTime,
              title: '',
              desc: '',
              body: '',
            },
          ],
        },
      ],
      /* -------------------------------------------------------------------- */
      /* temporary */
      /* -------------------------------------------------------------------- */
    };

    this.addProject = () => {
      this.setState((prevState) => {
        const currentTime = new Date().getTime();
        return {
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
        };
      });
    };

    this.removeProject = (articleId) => {
      this.setState((prevState) => ({
        projects: prevState.projects.filter(
          (article) => article.id !== articleId,
        ),
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
        }}
      >
        {this.props.children}
      </ProjectsContext.Provider>
    );
  }
}
