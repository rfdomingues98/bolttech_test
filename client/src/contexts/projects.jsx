/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const ProjectsContext = createContext();
export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);

  const loadProjects = async () => {
    const response = await api.get('/projects');
    setProjects(response.data);
    return response.data;
  };

  const createProject = async (name) => {
    const response = await api.post('/projects', { name });
    setProjects([response.data, ...projects]);
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    setProjects(projects.filter((el) => el._id !== id));
  };

  const renameProject = async (id, name) => {
    await api.put(`/projects/${id}`, { name });
    const index = projects.map((el) => el._id).indexOf(id);
    const projs = projects;
    projs[index].name = name;
    setProjects(projs);
  };

  const createTask = async (description, projectId) => {
    await api.post(`/tasks`, { description, projectId });
    await loadProjects();
  };

  const finishTask = async (id) => {
    await api.put(`/tasks/${id}`, { finished: true });
    await loadProjects();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    await loadProjects();
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loadProjects,
        createProject,
        deleteProject,
        renameProject,
        createTask,
        finishTask,
        deleteTask,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export function useProjects() {
  return useContext(ProjectsContext);
}
