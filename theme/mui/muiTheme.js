import { createTheme } from '@mui/material';

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgba(255,255,255,1)',
      light: 'rgba(43,44,48,1)',
      contrastText: 'rgba(255,255,255,1)',
    },
    background: { paper: 'rgba(15,15,15,1)', default: 'rgba(15,15,15,1)' },
    text: { secondary: 'rgba(255,255,255,1)' },
  },
  typography: { fontFamily: 'Roboto', fontSize: 14 },
  shape: { borderRadius: 8 },
});

export default muiTheme;
