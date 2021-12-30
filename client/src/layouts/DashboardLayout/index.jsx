import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { useAuth } from '../../contexts/auth';
import { ProjectsProvider } from '../../contexts/projects';
import ResponsiveAppBar from '../../components/Navbar';

const PREFIX = 'DashboardLayout';
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

const DashboardLayout = () => {
  const { signed } = useAuth();
  return (
    <Div className={classes.root}>
      {signed ? (
        <>
          <ResponsiveAppBar />
          <Container maxWidth="xxl">
            <div className={classes.wrapper}>
              <div className={classes.contentContainer}>
                <div className={classes.content}>
                  <ProjectsProvider>
                    <Outlet />
                  </ProjectsProvider>
                </div>
              </div>
            </div>
          </Container>
        </>
      ) : (
        <Navigate to="/signin" />
      )}
    </Div>
  );
};

export default DashboardLayout;
