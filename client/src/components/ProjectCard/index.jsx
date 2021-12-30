import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import {
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  FormGroup,
  Typography,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Task from '../Task';
import RenameProjectDialog from '../RenameProjectDialog';
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
});

const ProjectCard = ({ project }) => {
  const { deleteProject, createTask } = useProjects();
  const [anchorEl, setAnchorEl] = useState(null);
  const [rename, setRename] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [todoTasks, setTodoTasks] = useState(project.tasks.filter((task) => !task.finished));
  const [finishedTasks, setFinishedTasks] = useState(project.tasks.filter((task) => task.finished));

  const getTasks = () => {
    setTodoTasks(project.tasks.filter((task) => !task.finished).reverse());
    setFinishedTasks(project.tasks.filter((task) => task.finished));
  };

  useEffect(() => {
    getTasks();
  }, [project]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRename = () => {
    handleClose();
    setRename(true);
  };

  const deleteProj = async () => {
    handleClose();
    await deleteProject(project._id);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    await createTask(taskName, project._id);
    setTaskName('');
  };

  return (
    <>
      <RenameProjectDialog id={project._id} open={rename} setOpen={setRename} />
      <Card
        variant="outlined"
        sx={{
          maxWidth: 425,
          m: 0.5,
          maxHeight: 400,
          height: 'fit-content',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={handleClick} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={project.name}
        />
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleRename}>Rename</MenuItem>
          <MenuItem onClick={deleteProj}>Delete</MenuItem>
        </Menu>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 200,
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6">To Do</Typography>
          {todoTasks.map((el) => (
            <Task key={el._id} task={el} />
          ))}
          <Divider />
          <Typography variant="h6">Done</Typography>
          {finishedTasks.map((el) => (
            <Task key={el._id} task={el} />
          ))}
        </CardContent>
        <CardActions disableSpacing sx={{ position: 'relative' }}>
          <form onSubmit={(e) => handleAddTask(e)}>
            <FormGroup row>
              <StyledTextField
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task description"
                variant="outlined"
                size="small"
              />
              <StyledButton type="submit" variant="contained" disableElevation>
                Add task
              </StyledButton>
            </FormGroup>
          </form>
        </CardActions>
      </Card>
    </>
  );
};

export default ProjectCard;
