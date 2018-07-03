// @flow

import React from 'react';
// types
import type { Node } from 'react';
// databases
import firebase from 'databases/firebase.js';

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
  blockIds: Array<string>,
|};

type State = {
  projects: Array<ProjectProps>,
  activeProjectId: string,
};

export class ProjectsProvider extends React.Component<Props, State> {
  dbProjects: Object; // firebase database reference
  dbActiveProject: Object; // firebase database reference
  addProject: () => void;
  removeProject: (string) => void;
  updateProjectFieldText: (string, string, string) => void;
  setActiveProjectId: (string) => void;
  addBlockIdToProject: (string, string) => void;
  removeBlockIdFromProject: (string, string) => void;
  removeBlockIdFromAllProjects: (string) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      projects: [],
      activeProjectId: '',
    };

    this.dbProjects = firebase.database().ref('projects');
    this.dbActiveProject = firebase.database().ref('activeProject');

    this.addProject = () => {
      const currentTime = new Date().getTime();

      // add project to firebase and set it as the active project --------------
      const newProject = this.dbProjects.push({
        time: currentTime,
        title: '',
        desc: '',
      });

      this.dbActiveProject.set(newProject.key);
      // -----------------------------------------------------------------------

      // this.setState((prevState) => ({
      //   projects: prevState.projects.concat({
      //     id: currentTime.toString(),
      //     time: currentTime,
      //     title: '',
      //     desc: '',
      //     blockIds: [],
      //   }),
      //   activeProjectId: currentTime.toString(),
      // }));
    };

    this.removeProject = (projectId) => {
      // remove project from firebase ------------------------------------------
      const dbProject = this.dbProjects.child(projectId);
      dbProject.remove();
      // -----------------------------------------------------------------------

      // this.setState((prevState) => ({
      //   projects: prevState.projects.filter((p) => p.id !== projectId),
      // }));
    };

    this.updateProjectFieldText = (projectId, fieldName, text) => {
      // update project field in firebase --------------------------------------
      this.dbProjects.child(`${projectId}/${fieldName}`).set(text);
      // -----------------------------------------------------------------------

      // this.setState((prevState) => {
      //   const projects = [...prevState.projects];
      //   const project = projects.filter((p) => p.id === projectId)[0];
      //   project[fieldName] = text;
      //
      //   return {
      //     projects: projects,
      //   };
      // });
    };

    this.setActiveProjectId = (projectId) => {
      // set active project in firebase ----------------------------------------
      this.dbActiveProject.set(projectId);
      // -----------------------------------------------------------------------

      // this.setState((prevState) => ({
      //   activeProjectId: projectId,
      // }));
    };

    this.addBlockIdToProject = (projectId, blockId) => {
      // add blockId to project in firebase ------------------------------------
      this.dbProjects.child(`${projectId}/blockIds`).push(blockId);
      // -----------------------------------------------------------------------

      // this.setState((prevState) => {
      //   const projects = [...prevState.projects];
      //   const project = projects.filter((p) => p.id === projectId)[0];
      //   project.blockIds.push(blockId);
      //
      //   return {
      //     projects: projects,
      //   };
      // });
    };

    this.removeBlockIdFromProject = (projectId, blockId) => {
      // remove blockId from project in firebase -------------------------------
      this.dbProjects
        .child(`${projectId}/blockIds`)
        .orderByValue()
        .equalTo(blockId)
        .on('child_added', (snapshot) => {
          snapshot.ref.remove();
        });
      // -----------------------------------------------------------------------

      // this.setState((prevState) => {
      //   const projects = [...prevState.projects];
      //   const project = projects.filter((p) => p.id === projectId)[0];
      //   const updatedBlockIds = project.blockIds.filter((id) => id !== blockId);
      //   project.blockIds = updatedBlockIds;
      //
      //   return {
      //     projects: projects,
      //   };
      // });
    };

    this.removeBlockIdFromAllProjects = (blockId) => {
      // remove blockId from all projects in firebase --------------------------
      this.state.projects.forEach((project) => {
        this.dbProjects
          .child(`${project.id}/blockIds`)
          .orderByValue()
          .equalTo(blockId)
          .on('child_added', (snapshot) => {
            snapshot.ref.remove();
          });
      });
      // -----------------------------------------------------------------------

      // this.setState((prevState) => {
      //   const projects = [...prevState.projects];
      //   projects.map((project) => {
      //     project.blockIds = project.blockIds.filter((id) => id !== blockId);
      //     return project;
      //   });
      //
      //   return {
      //     projects: projects,
      //   };
      // });
    };
  }

  componentDidMount() {
    // get projects and active project from firebase ---------------------------
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
          time: project.time,
          title: project.title,
          desc: project.desc,
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
    // -------------------------------------------------------------------------
  }

  render() {
    return (
      <ProjectsContext.Provider
        value={{
          ...this.state,
          addProject: this.addProject,
          removeProject: this.removeProject,
          updateProjectFieldText: this.updateProjectFieldText,
          setActiveProjectId: this.setActiveProjectId,
          addBlockIdToProject: this.addBlockIdToProject,
          removeBlockIdFromProject: this.removeBlockIdFromProject,
          removeBlockIdFromAllProjects: this.removeBlockIdFromAllProjects,
        }}
      >
        {this.props.children}
      </ProjectsContext.Provider>
    );
  }
}
