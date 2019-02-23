// @flow

import React from 'react';
// types
import type { Node } from 'react';
import type { Database } from 'components/App';
// utilities
import { setKeyValue } from 'utilities';
// databases
import firebase, { version } from 'config/firebase';

// --- contexts
export const ProjectsContext: any = React.createContext();

// --- components
type Props = {|
  db: Database,
  children: Node,
  // context props
  userId: ?string,
|};

export type ProjectProps = {|
  id: string,
  meta: {|
    time: number,
    title: string,
    desc: string,
  |},
  blockIds: Array<string>,
|};

type State = {|
  projects: Array<ProjectProps>,
  activeProjectId: string,
  addProject: () => void,
  removeProject: (projectId: string) => void,
  updateProjectFieldText: (
    projectId: string,
    field: string,
    text: string,
  ) => void,
  setActiveProjectId: (projectId: string) => void,
  addBlockIdToProject: (
    projectId: string,
    blockId: string,
    toIndex: ?number,
  ) => void,
  removeBlockIdFromProject: (projectId: string, blockId: string) => void,
  removeBlockIdFromAllProjects: (blockId: string) => void,
  reorderBlocksInProject: (
    projectId: string,
    fromIndex: number,
    toIndex: number,
  ) => void,
|};

export class ProjectsProvider extends React.Component<Props, State> {
  state: State = {
    projects: [],
    activeProjectId: '',
    addProject: () => {
      return this.addProject();
    },
    removeProject: (projectId) => {
      return this.removeProject(projectId);
    },
    updateProjectFieldText: (projectId, field, text) => {
      return this.updateProjectFieldText(projectId, field, text);
    },
    setActiveProjectId: (projectId) => {
      return this.setActiveProjectId(projectId);
    },
    addBlockIdToProject: (projectId, blockId, toIndex) => {
      return this.addBlockIdToProject(projectId, blockId, toIndex);
    },
    removeBlockIdFromProject: (projectId, blockId) => {
      return this.removeBlockIdFromProject(projectId, blockId);
    },
    removeBlockIdFromAllProjects: (blockId) => {
      return this.removeBlockIdFromAllProjects(blockId);
    },
    reorderBlocksInProject: (projectId, fromIndex, toIndex) => {
      return this.reorderBlocksInProject(projectId, fromIndex, toIndex);
    },
  };

  // firebase db reference to user
  dbUser: Object = firebase
    .database()
    .ref(`version/${version}/users/${this.props.userId}`);

  // firebase db reference to user's projects
  dbProjects: Object = this.dbUser.child('projects');

  // firebase db reference to user's active project
  dbActiveProject: Object = this.dbUser.child('activeProject');

  addProject = () => {
    const currentTime = new Date().getTime();

    if (this.props.db === 'memory') {
      this.setState((prevState) => ({
        projects: prevState.projects.concat({
          id: currentTime.toString(),
          meta: {
            time: currentTime,
            title: '',
            desc: '',
          },
          blockIds: [],
        }),
        activeProjectId: currentTime.toString(),
      }));
    }

    if (this.props.db === 'firebase') {
      const newProject = this.dbProjects.push({
        meta: {
          time: currentTime,
          title: '',
          desc: '',
        },
      });

      this.dbActiveProject.set(newProject.key);
    }

    return;
  };

  removeProject = (projectId: string) => {
    if (this.props.db === 'memory') {
      this.setState((prevState) => ({
        projects: prevState.projects.filter((p) => p.id !== projectId),
      }));
    }

    if (this.props.db === 'firebase') {
      const dbProject = this.dbProjects.child(projectId);
      dbProject.remove();
    }

    return;
  };

  updateProjectFieldText = (projectId: string, field: string, text: string) => {
    const fields = field.split('.'); // 'meta.title' -> ['meta', 'title']

    if (this.props.db === 'memory') {
      this.setState((prevState) => {
        const projects = [...prevState.projects];
        const project = projects.filter((p) => p.id === projectId)[0];
        setKeyValue(project, fields, text);

        return {
          projects: projects,
        };
      });
    }

    if (this.props.db === 'firebase') {
      const path = fields.join('/'); // ['meta', 'title'] -> 'meta/title'
      this.dbProjects.child(`${projectId}/${path}`).set(text);
    }

    return;
  };

  setActiveProjectId = (projectId: string) => {
    if (this.props.db === 'memory') {
      this.setState((prevState) => ({
        activeProjectId: projectId,
      }));
    }

    if (this.props.db === 'firebase') {
      this.dbActiveProject.set(projectId);
    }

    return;
  };

  addBlockIdToProject = (
    projectId: string,
    blockId: string,
    toIndex: ?number,
  ) => {
    if (this.props.db === 'memory') {
      this.setState((prevState) => {
        const projects = [...prevState.projects];
        const project = projects.filter((p) => p.id === projectId)[0];
        // if toIndex (third argument) isn't passed to method,
        // set toIndex so block will be added to the end
        if (!toIndex) toIndex = project.blockIds.length;
        // insert block at toIndex
        project.blockIds.splice(toIndex, 0, blockId);

        return {
          projects: projects,
        };
      });
    }

    if (this.props.db === 'firebase') {
      const dbBlockIds = this.dbProjects.child(`${projectId}/blockIds`);
      // add blockId to the end of the project's blockIds array
      dbBlockIds.push(blockId);
      // if toIndex (third argument) isn't passed to method, we're done
      // else, we need to re-order the project's blockIds
      if (toIndex === undefined) return;
      // firebase stores everything as objects, so we need to convert the
      // blockIds data back to an array by iterating over each object's key
      // (blockIdsKey below is the key auto-generated by firebase)
      let blockIdsArray = [];
      dbBlockIds.on('value', (snapshot) => {
        const blockIds = snapshot.val();
        for (let blockIdsKey in blockIds) {
          blockIdsArray.push(blockIds[blockIdsKey]);
        }
      });
      // null/undefined check for flow (toIndex will always be a number here)
      if (toIndex !== null && toIndex !== undefined) {
        // remove blockId from end, and re-insert back at toIndex
        blockIdsArray.splice(-1, 1);
        blockIdsArray.splice(toIndex, 0, blockId);
      }
      // store re-ordered blockIds in firebase
      dbBlockIds.remove();
      blockIdsArray.forEach((blockId) => dbBlockIds.push(blockId));
    }
  };

  removeBlockIdFromProject = (projectId: string, blockId: string) => {
    if (this.props.db === 'memory') {
      this.setState((prevState) => {
        const projects = [...prevState.projects];
        const project = projects.filter((p) => p.id === projectId)[0];
        const updatedBlockIds = project.blockIds.filter((id) => id !== blockId);
        project.blockIds = updatedBlockIds;

        return {
          projects: projects,
        };
      });
    }

    if (this.props.db === 'firebase') {
      this.dbProjects
        .child(`${projectId}/blockIds`)
        .orderByValue()
        .equalTo(blockId)
        .once('child_added', (snapshot) => {
          snapshot.ref.remove();
        });
    }
  };

  removeBlockIdFromAllProjects = (blockId: string) => {
    if (this.props.db === 'memory') {
      this.setState((prevState) => {
        const projects = [...prevState.projects];
        projects.map((project) => {
          project.blockIds = project.blockIds.filter((id) => id !== blockId);
          return project;
        });

        return {
          projects: projects,
        };
      });
    }

    if (this.props.db === 'firebase') {
      this.state.projects.forEach((project) => {
        this.dbProjects
          .child(`${project.id}/blockIds`)
          .orderByValue()
          .equalTo(blockId)
          .once('child_added', (snapshot) => {
            snapshot.ref.remove();
          });
      });
    }
  };

  reorderBlocksInProject = (
    projectId: string,
    fromIndex: number,
    toIndex: number,
  ) => {
    if (this.props.db === 'memory') {
      this.setState((prevState) => {
        const projects = [...prevState.projects];
        const project = projects.filter((p) => p.id === projectId)[0];
        // remove block at fromIndex, and re-insert back at toIndex
        const blockId = project.blockIds.splice(fromIndex, 1)[0];
        project.blockIds.splice(toIndex, 0, blockId);

        return {
          projects: projects,
        };
      });
    }

    if (this.props.db === 'firebase') {
      const dbBlockIds = this.dbProjects.child(`${projectId}/blockIds`);
      // firebase stores everything as objects, so we need to convert the
      // blockIds data back to an array by iterating over each object's key
      // (blockIdsKey below is the key auto-generated by firebase)
      let blockIdsArray = [];
      dbBlockIds.on('value', (snapshot) => {
        const blockIds = snapshot.val();
        for (let blockIdsKey in blockIds) {
          blockIdsArray.push(blockIds[blockIdsKey]);
        }
      });
      // remove block at fromIndex, and re-insert back at toIndex
      const blockId = blockIdsArray.splice(fromIndex, 1)[0];
      blockIdsArray.splice(toIndex, 0, blockId);
      // store re-ordered blockIds in firebase
      dbBlockIds.remove();
      blockIdsArray.forEach((blockId) => dbBlockIds.push(blockId));
    }
  };

  componentDidMount() {
    if (this.props.db === 'firebase') {
      this.dbProjects.on('value', (snapshot) => {
        const projects = snapshot.val();
        // firebase stores everything as objects, so we need to convert the
        // projects data back to an array by iterating over each object's key
        // (projectsKey below is the key auto-generated by firebase)
        let updatedProjects = [];
        for (let projectsKey in projects) {
          const project = projects[projectsKey];

          // same song and dance for building up blockIds array...
          // (blocksIdKey below is the key auto-generated by firebase)
          let blockIds = [];
          for (let blocksIdKey in project.blockIds) {
            blockIds.push(project.blockIds[blocksIdKey]);
          }

          updatedProjects.push({
            id: projectsKey,
            meta: project.meta,
            blockIds: blockIds,
          });
        }

        this.setState((prevState) => ({
          projects: updatedProjects,
        }));
      });

      this.dbActiveProject.on('value', (snapshot) => {
        this.setState((prevState) => ({
          activeProjectId: snapshot.val(),
        }));
      });
    }
  }

  render() {
    return (
      <ProjectsContext.Provider value={this.state}>
        {this.props.children}
      </ProjectsContext.Provider>
    );
  }
}
