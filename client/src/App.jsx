import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import { theme } from './config/theme';
import './App.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  </ThemeProvider>
);

export default App;
