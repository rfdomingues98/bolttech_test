import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const PREFIX = 'MainLayout';

const classes = {
  root: `${PREFIX}-root`,
  wrapper: `${PREFIX}-wrapper`,
  contentContainer: `${PREFIX}-contentContainer`,
  content: `${PREFIX}-content`,
};

const Div = styled('div')(({ theme }) => ({
  [`& .${classes.root}`]: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
    maxWidth: 'inherit',
  },
  [`& .${classes.wrapper}`]: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  [`& .${classes.contentContainer}`]: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  [`& .${classes.content}`]: {
    flex: '1 1 auto',
    height: '100%',
    overflowX: 'hidden',
  },
}));

const MainLayout = () => (
  <Div className={classes.root}>
    <div className={classes.wrapper}>
      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  </Div>
);

export default MainLayout;
