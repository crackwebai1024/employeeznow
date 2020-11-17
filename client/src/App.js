import React, { useState } from "react";
import { connect } from "react-redux";
import { actions as authActions } from "@store/auth";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "@components/Header";
import Footer from "@components/Footer";
import theme from "@helpers/Theme";
import AppRouter from "@router/AppRouter";
import { getBoxSize } from "@helpers/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

toast.configure();

const useStyles = makeStyles((theme) => ({
  content: {
    background: '#f3f2ef',
    paddingTop: '3rem',
    paddingBottom: '3rem'
  }
}))

function App(props) {
  const [value, setValue] = useState(1);
  const isAuthenticated = localStorage.getItem("USER") ? true : false;
  const classes = useStyles()

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
          <Box minHeight={getBoxSize()} className={classes.content}>
            <AppRouter />
          </Box>
          <Footer
            isAuthenticated={isAuthenticated}
            value={value}
            setValue={setValue}
          />
        </Router>
      </ThemeProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
}

const mapStateToProps = ({
  auth: { signupUser, isSentPhoneNumber, isAuthenticated, user },
}) => ({
  signupUser,
  isSentPhoneNumber,
  isAuthenticated,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...authActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
