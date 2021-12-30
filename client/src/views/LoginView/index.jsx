import React from 'react';
import { Container, Typography, Avatar, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import SigninForm from '../../components/SigninForm';

const PREFIX = 'LoginView';

const classes = {
  paper: `${PREFIX}-paper`,
  avatar: `${PREFIX}-avatar`,
};

const Div = styled('div')(({ theme }) => ({
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  [`& .${classes.avatar}`]: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

const LoginView = () => (
  <Div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SigninForm />
      </div>
    </Container>
  </Div>
);

export default LoginView;
