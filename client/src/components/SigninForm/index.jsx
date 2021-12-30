import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { TextField, Button, Link, Snackbar } from '@mui/material';
import { useAuth } from '../../contexts/auth';
import Alert from '../Alert';

const PREFIX = 'SigninForm';

const classes = {
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`,
};

const Div = styled('div')(({ theme }) => ({
  [`& .${classes.form}`]: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SigninForm = () => {
  const { signed, Login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alertInfo, setAlertInfo] = useState({});

  useEffect(() => {
    if (signed) navigate('/dashboard');
  }, [signed]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = await Login({
      username,
      password,
    });
    if (login.error) {
      setOpen(true);
      setAlertInfo({ severity: 'error', msg: login.message });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <Div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertInfo.severity} sx={{ width: '100%' }}>
          {alertInfo.msg}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Username"
          name="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>
          Still don&apos;t have an account? <Link href="/signup">Sign up now.</Link>
        </span>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </Div>
  );
};

export default SigninForm;
