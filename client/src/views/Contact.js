import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Grid, Typography, Box, TextField } from "@material-ui/core";
import MainButton from "@components/Element/Button/MainButton";
import { connect } from "react-redux";
import { actions as authActions } from "@store/auth";
import { bindActionCreators } from "redux";
import { successMessage, errorMessage } from "@helpers/utils";
import { useForm } from "react-hook-form";

const invalidError = "This field is invalid!";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "auto",
    [theme.breakpoints.down("md")]: {},
  },
  title: {
    fontSize: "24px",
    fontWeight: 400,
    color: theme.palette.common.green,
  },
  contestContainer: {
    background: "#FAFAFA",
    textAlign: "center",
    width: "100%",
  },
  col_center: {
    display: "flex",
    alignItems: "center",
  },
  servingImage: {
    padding: "3rem",
    margin: "auto",
    maxWidth: "300px",
  },
  sub_title: {
    textAlign: "center",
    fontSize: "18px",
    marginBottom: "0.5rem",
  },
  buttonWrapper: {
    margin: "1.5rem 0 1rem 0",
    width: "fit-content",
  },
  formContainer: {
    padding: "2rem 0 0 2rem",
    maxWidth: "600px",
  },
  contactInfo: {
    maxWidth: "600px",
    textAlign: "center",
    margin: "auto",
    marginBottom: "4rem",
  },
  contactInfoTitle: {
    color: theme.palette.common.green,
    marginBottom: "1rem",
    fontSize: "28px",
  },
  center: {
    margin: "auto",
  },
  Wrapper: {
    background: "white",
    marginTop: "-3rem",
    marginBottom: "-3rem",
  },
}));

const Contact = ({ actions, sendMessage }) => {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({});

  const onSubmit = (data) => {
    actions.sendContactMessage(data);
  };

  useEffect(() => {
    if (sendMessage === "SUCCESS") {
      successMessage("Your Message was sent to employeez successfully!");
    } else if (sendMessage === "FAILURE") {
      errorMessage("Message sending failed!");
    }
  }, [sendMessage]);

  return (
    <Box className={classes.Wrapper}>
      <Container width="sm" className={classes.mainContainer}>
        <Grid
          container
          ustify="center"
          spacing={0}
          style={{ paddingBottom: "6rem" }}
        >
          <Grid xs={12} className={classes.servingImage}>
            <img
              style={{ width: "100%" }}
              alt="img"
              src={`${process.env.PUBLIC_URL}/img/test/serving.svg`}
            />
          </Grid>
          <Grid xs={12}>
            <Typography className={classes.sub_title}>
              EmployeezNow is not just another job site, but
            </Typography>
            <div className={classes.title} style={{ textAlign: "center" }}>
              THE FIRST <br />
              EMPLOYEE SEARCH ENGINE FOR HOSPITALITY
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            className={classes.col_center}
            style={{ marginTop: "1rem" }}
          >
            <Box className={classes.center}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className={classes.formContainer}
              >
                <Grid container xs={12} spacing={3}>
                  <Grid item xs={12}>
                    <Typography className={classes.title}>
                      Contact Us
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      error={errors.firstName ? true : false}
                      helperText={errors.firstName ? invalidError : ""}
                      fullWidth
                      label="Fist Name"
                      name="firstName"
                      size="small"
                      required
                      inputRef={register({ required: true })}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      error={errors.lastName ? true : false}
                      helperText={errors.lastName ? invalidError : ""}
                      label="Last Name"
                      required
                      size="small"
                      inputRef={register({ required: true })}
                      name="lastName"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      error={errors.email ? true : false}
                      helperText={errors.email ? invalidError : ""}
                      type="email"
                      required
                      name="email"
                      inputRef={register({
                        required: true,
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                      label="Email"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-static"
                      fullWidth
                      error={errors.comment ? true : false}
                      helperText={errors.comment ? invalidError : ""}
                      inputRef={register({ required: true })}
                      label="Comment or Message"
                      variant="outlined"
                      multiline
                      size="small"
                      name="content"
                      rows={5}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box className={classes.buttonWrapper}>
                    <MainButton
                      label="Send Message"
                      background="green"
                      border="green"
                      pd={60}
                      hoverColor="white"
                      hoverBack="#007000"
                      color="white"
                      fontSize={16}
                      onClick={handleSubmit(onSubmit)}
                    ></MainButton>
                  </Box>
                </Grid>
              </form>
            </Box>
          </Grid>

          <Grid item xs={12} md={5} style={{ marginTop: "2rem" }}>
            <div style={{ padding: "75% 0 0 0", position: "relative" }}>
              {/* title=0&byline=0&portrait=0 */}
              <iframe
                src="https://player.vimeo.com/video/484177026?title=0&byline=0&portrait=0"
                title="iframe"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                frameborder="0"
                allow="autoplay; fullscreen"
                allowfullscreen
              ></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </Grid>
        </Grid>
        <Grid container item xs={12} className={classes.contactInfo}>
          <Grid xs={12}>
            <Typography className={classes.contactInfoTitle}>
              Contact Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontWeight: "600" }}>
              PHONE: (888) 66 EZ-NOW
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography style={{ fontWeight: "600" }}>
              EMAIL: QUESTIONS@EMPLOYEEZNOW
            </Typography>
          </Grid>
          <Box
            item
            xs={12}
            sm={12}
            style={{ display: "flex", paddingTop: "1rem", margin: "auto" }}
          >
            <Typography style={{ fontWeight: "600" }}>
              ADDRESS : &nbsp;
            </Typography>
            <Typography style={{ textAlign: "left" }}>
              <span style={{ fontWeight: "600" }}>
                3133 W. Frye Rd Suite 101 Chandler, AZ 85226
              </span>
            </Typography>
          </Box>
        </Grid>
      </Container>

      <Grid container className={classes.contestContainer}>
        {/* <ContestSection /> */}
      </Grid>
    </Box>
  );
};

const mapStateToProps = ({ auth: { sendMessage } }) => ({
  sendMessage,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...authActions,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
