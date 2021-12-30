import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { TextField, Button, Link } from '@mui/material';
import { useAuth } from '../../contexts/auth';

const PREFIX = 'SignupForm';

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

const SignupForm = () => {
  const { signed, Register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (signed) navigate('/dashboard');
  }, [signed]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Register({
      username,
      password,
    });
    navigate('/signin');
  };

  return (
    <Div>
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
          Already have an account? <Link href="/signin">Sign in now.</Link>
        </span>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign up
        </Button>
      </form>
    </Div>
  );
};

export default SignupForm;
