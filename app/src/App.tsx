import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import './App.css';
import HomePage from './components/HomePage';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
