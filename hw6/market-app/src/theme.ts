import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D1B2A', 
    },
    secondary: {
      main: '#FCCA46', 
    },
    background: {
      default: '#FFFFFF',
      paper: '#E0E1DD', 
    },
    text: {
      primary: '#0D1B2A', 
      secondary: '#415A77',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
