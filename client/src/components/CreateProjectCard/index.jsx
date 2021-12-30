import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { CardHeader, CardActions, TextField, Button, FormGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useProjects } from '../../contexts/projects';

const StyledTextField = styled(TextField)({
  '& fieldset': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});

const StyledButton = styled(Button)({
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  cursor: 'pointer',
});

const CreateProjectCard = () => {
  const { createProject } = useProjects();
  const [projectName, setProjectName] = useState('');

  const handleClick = async (e) => {
    e.preventDefault();
    await createProject(projectName);
    setProjectName('');
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 400, m: 0.5, height: 'fit-content' }}>
      <CardHeader title="Create Project" />
      <CardActions disableSpacing sx={{ display: 'flex' }}>
        <form onSubmit={(e) => handleClick(e)}>
          <FormGroup row sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <StyledTextField
              placeholder="Project Name"
              variant="outlined"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              sx={{ mb: 1 }}
            />
            <StyledButton type="submit" variant="contained" disableElevation sx={{ mb: 2 }}>
              Create Project
            </StyledButton>
          </FormGroup>
        </form>
      </CardActions>
    </Card>
  );
};

export default CreateProjectCard;
