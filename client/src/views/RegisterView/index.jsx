import React from 'react';
import { Container, Typography, Avatar, CssBaseline } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { styled } from '@mui/material/styles';
import SignupForm from '../../components/SignupForm';

const PREFIX = 'RegisterView';

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

const RegisterView = () => (
  <Div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddAltIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignupForm />
      </div>
    </Container>
  </Div>
);

export default RegisterView;
