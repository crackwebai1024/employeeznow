import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actions as authActions } from '@store/auth';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '@components/Header';
import Footer from '@components/Footer'
import theme from '@helpers/Theme'
import AppRouter from '@router/AppRouter'
import { getBoxSize } from '@helpers/utils'
import './App.css';

function App(props) {
  const [value, setValue] = useState(1);
  const isAuthenticated = localStorage.getItem('USER') ? true : false
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header
            isAuthenticated={isAuthenticated}
            slug=""
            value={value}
            setValue={setValue}
          // selectedIndex={selectedIndex}
          // setSelectedIndex={setSelectedIndex}
          />
          <Box minHeight={getBoxSize()} style={{ background: 'white' }}>
            <AppRouter />
          </Box>
          <Footer
            isAuthenticated={isAuthenticated}
            value={value}
            setValue={setValue}
          />
        </Router>
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = ({
  auth: {
    signupUser, isSentPhoneNumber, isAuthenticated, user
  },
}) => ({
  signupUser, isSentPhoneNumber, isAuthenticated, user
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
