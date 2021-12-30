import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from '@mui/material/Box';
import moment from 'moment';
import { useProjects } from '../../contexts/projects';

const Task = ({ task }) => {
  const { finishTask, deleteTask } = useProjects();
  const [checked, setChecked] = useState(task.finished);
  const [finishedDate, setFinishedDate] = useState(task.updatedAt);

  const setFinished = async () => {
    setChecked(true);
    await finishTask(task._id);
    setFinishedDate(Date.now());
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <FormGroup sx={{ alignItems: 'flex-start' }}>
        <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Tooltip
            disableFocusListener
            title={checked ? moment(finishedDate).format('DD/MM/YYYY HH:mm') : ''}
            arrow
          >
            <FormControlLabel
              disabled={checked}
              control={<Checkbox onChange={setFinished} checked={checked} />}
              label={task.description}
            />
          </Tooltip>
        </Box>
      </FormGroup>
      {!checked ? <DeleteOutlineIcon onClick={handleDelete} sx={{ cursor: 'pointer' }} /> : null}
    </Box>
  );
};

export default Task;
