import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useProjects } from '../../contexts/projects';
import ProjectCard from '../../components/ProjectCard';
import CreateProjectCard from '../../components/CreateProjectCard';

const DashboardView = () => {
  const { projects, loadProjects } = useProjects();

  useState(() => {
    loadProjects();
  }, [projects]);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      {projects && projects.map((el) => <ProjectCard key={el._id} project={el} />)}
      <CreateProjectCard />
    </Box>
  );
};

export default DashboardView;
