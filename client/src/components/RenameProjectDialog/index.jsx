import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useProjects } from '../../contexts/projects';

const RenameProjectDialog = ({ id, open, setOpen }) => {
  const { renameProject } = useProjects();
  const [name, setName] = useState('');

  const handleRename = async () => {
    await renameProject(id, name);
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rename Project</DialogTitle>
        <DialogContent>
          <DialogContentText>What is the new name of the project?</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRename}>Rename</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RenameProjectDialog;
