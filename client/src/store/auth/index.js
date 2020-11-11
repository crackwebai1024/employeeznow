import { handleActions, createActions } from "redux-actions";

import initialState, * as handlers from "./handlers";

export const actions = createActions({
  SIGNUP_REQUEST: undefined,
  EMAIL_SUCCESS: undefined,
  EMAIL_FAILURE: undefined,

  PHONE_VERIFY_REQUEST_REQUEST: undefined,
  PHONE_VERIFY_REQUEST_SUCCESS: undefined,
  PHONE_VERIFY_REQUEST_FAILURE: undefined,

  SIGNUP_CONFIRM_REQUEST: undefined,
  SIGNUP_CONFIRM_SUCCESS: undefined,
  SIGNUP_CONFIRM_FAILURE: undefined,

  LOGIN_REQUEST: undefined,
  LOGIN_SUCCESS: undefined,
  LOGIN_FAILURE: undefined,

  AUTHENTICATE_REQUEST: undefined,
  AUTHENTICATE_SUCCESS: undefined,
  AUTHENTICATE_FAILURE: undefined,

  IS_AUTHENTICATED_REQUEST: undefined,
  IS_AUTHENTICATED_SUCCESS: undefined,
  IS_AUTHENTICATED_FAILURE: undefined,

  LOGOUT_REQUEST: undefined,
  LOGOUT_SUCCESS: undefined,
  LOGOUT_FAILURE: undefined,

  RESET_LOGIN_ERROR: undefined,

  SIGNUPUSER_EMPTY: undefined,

  EMPLOYER_SIGNUP_REQUEST: undefined,
  EMPLOYER_EMAIL_VERIFY: undefined,

  EMPLOYER_EMAIL_VERIFY_FAILURE: undefined,
  EMPLOYER_EMAIL_CODE_SEND: undefined,
  EMAIL_CODE_SEND_FAILURE: undefined,

  FORGOT_PASSWORD_REQUEST: undefined,
  FORGOT_PASSWORD_SUCCESS: undefined,
  FORGOT_PASSWORD_FAILURE: undefined,

  RESET_PASSWORD_REQUEST: undefined,
  RESET_PASSWORD_SUCCESS: undefined,
  RESET_PASSWORD_FAILURE: undefined,

  CHANGE_PASSWORD_REQUEST: undefined,
  CHANGE_PASSWORD_SUCCESS: undefined,
  CHANGE_PASSWORD_FAILURE: undefined,

  SAVE_VETERAN_CARD: undefined,

  SEND_CONTACT_MESSAGE: undefined,

  SEND_MESSAGE_SUCCESS: undefined,
  SEND_MESSAGE_FAILURE: undefined
});

const reducer = handleActions(
  new Map([
    [actions.signupRequest, handlers.signupRequest],
    [actions.emailSuccess, handlers.emailSuccess],
    [actions.emailFailure, handlers.emailFailure],

    [actions.loginRequest, handlers.loginRequest],
    [actions.loginSuccess, handlers.loginSuccess],
    [actions.loginFailure, handlers.loginFailure],

    [actions.signupConfirmRequest, handlers.signupConfirmRequest],
    [actions.signupConfirmSuccess, handlers.signupConfirmSuccess],
    [actions.signupConfirmFailure, handlers.signupConfirmFailure],

    [actions.phoneVerifyRequestRequest, handlers.phoneVerifyRequestRequest],
    [actions.phoneVerifyRequestSuccess, handlers.phoneVerifyRequestSuccess],
    [actions.phoneVerifyRequestFailure, handlers.phoneVerifyRequestFailure],

    [actions.authenticateRequest, handlers.authenticateRequest],
    [actions.authenticateSuccess, handlers.authenticateSuccess],
    [actions.authenticateFailure, handlers.authenticateFailure],

    [actions.isAuthenticatedRequest, handlers.isAuthenticatedRequest],
    [actions.isAuthenticatedSuccess, handlers.isAuthenticatedSuccess],
    [actions.isAuthenticatedFailure, handlers.isAuthenticatedFailure],

    [actions.logoutRequest, handlers.logoutRequest],
    [actions.logoutSuccess, handlers.logoutSuccess],
    [actions.logoutFailure, handlers.logoutFailure],

    [actions.resetLoginError, handlers.resetLoginError],
    [actions.signupuserEmpty, handlers.signupuserEmpty],

    [actions.employerSignupRequest, handlers.employerSignupRequest],
    [actions.employerEmailVerify, handlers.employerEmailVerify],
    [actions.employerEmailVerifyFailure, handlers.employerEmailVerifyFailure],
    [actions.employerEmailCodeSend, handlers.employerEmailCodeSend],

    [actions.emailCodeSendFailure, handlers.emailCodeSendFailure],

    [actions.forgotPasswordRequest, handlers.forgotPasswordRequest],
    [actions.forgotPasswordSuccess, handlers.forgotPasswordSuccess],
    [actions.forgotPasswordFailure, handlers.forgotPasswordFailure],

    [actions.resetPasswordRequest, handlers.resetPasswordRequest],
    [actions.resetPasswordSuccess, handlers.resetPasswordSuccess],
    [actions.resetPasswordFailure, handlers.resetPasswordFailure],

    [actions.changePasswordRequest, handlers.changePasswordRequest],
    [actions.changePasswordSuccess, handlers.changePasswordSuccess],
    [actions.changePasswordFailure, handlers.changePasswordFailure],

    [actions.saveVeteranCard, handlers.saveVeteranCard],

    [actions.sendContactMessage, handlers.sendContactMessage],
    [actions.sendMessageSuccess, handlers.sendMessageSuccess],
    [actions.sendMessageFailure, handlers.sendMessageFailure],

  ]),
  initialState
);

export default reducer;
