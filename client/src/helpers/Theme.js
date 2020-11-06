import { createMuiTheme } from '@material-ui/core/styles';

////****  This theme is available anywahere - common styles  ****////
const employeezNowBlue = '#172940';
const employeezNowWinered = '#228800';

export default createMuiTheme({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple"
    },
    "& .MuiOutlinedInput-input": {
      color: "green"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "red"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "purple"
    },
    "& .MuiInputLabel-outlined": {
      color: "green"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "red"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "purple"
    }
  },
  palette: {
    common: {
      white: '#fcfcfc',
      hover_white: '#f3f3f3',
      blue: '#6098E0',
      black: '#100C08',
      gray: '#9E9E9E',
      lightBlack: "#757575",
      darkgray: "#424242",
      darkBlue: '#2771E0',
      pink: '#FC0F59',
      yellow: '#FFD101',
      green: '#228800'
    },
    primary: {
      main: employeezNowBlue,
      extra: '#1f73be'
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
