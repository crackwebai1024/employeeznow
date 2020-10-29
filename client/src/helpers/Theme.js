import { createMuiTheme } from '@material-ui/core/styles';

////****  This theme is available anywahere - common styles  ****////
//#16283f
const employeezNowBlue = '#172940';
const employeezNowWinered = '#7D1D1E';

export default createMuiTheme({
  palette: {
    common: {
      white: '#ffffff',
      blue: '#6098E0',
      black: '#000000E1',
      lightBlack: "#00000091",
      darkBlue: '#2771E0',
      pink: '#FC0F59',
      yellow: '#FFF92D',
      green: '#008000'
    },
    primary: {
      main: employeezNowBlue,
    },
    secondary: {
      main: employeezNowWinered,
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '0.1rem',
    },
    h2: {
      fontSize: '2.5rem',
      letterSpacing: '0rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '2.125rem',
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
  },
  spinner: {
    position: 'fixed',
    top: '50%',
    left: ' 50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1304,
  },
});
