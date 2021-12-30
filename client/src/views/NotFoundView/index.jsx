import React from 'react';
import { Box, Container, Typography } from '@mui/material/';
import { styled } from '@mui/material/styles';
import Page from '../../components/Page';

const PREFIX = 'NotFoundView';
const classes = {
  root: `${PREFIX}-root`,
  image: `${PREFIX}-image`,
};

const Div = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  [`& .${classes.image}`]: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
  },
}));

const NotFoundView = () => (
  <Div>
    <Page className={classes.root} title="404">
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h1">
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="textPrimary" variant="subtitle2">
            You either tried some shady route or you came here by mistake. Whichever it is, try
            using the navigation
          </Typography>
        </Container>
      </Box>
    </Page>
  </Div>
);

export default NotFoundView;
