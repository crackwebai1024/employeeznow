const initialState = {
  isAuthenticated: false,
  error: "",
  user: {},
  isAuthenticatedLoading: true,
  keepSignIn: false,
  isLoading: false,
  isAdmin: false,
  loginError: null,
  isLoginLoading: false,
  registered: false,
  loginStatus: null,
  registerError: "",
  isRegisterLoading: false,
  signupUser: {},
  digicodeConfirmError: false,
  longinStatus: null,
  phoneVerifyNeed: false,
  isSentPhoneNumber: false,
  isSingupUser: false,
  isEmailCodeError: "",
  changepassword: null,
  resetPassword: null,
  sendMessage: "NONE",
  voterEmailValid: "NONE",
};

export const signupRequest = (state, { payload }) => ({
  ...state,
  signupUser: payload,
  role: "employee",
  signupLoading: true,
  isSingupUser: true,
  emailFailure: false,
});

export const signupuserEmpty = (state, { payload }) => ({
  ...state,
  isSingupUser: false,
  phoneVerifyNeed: false,
});

export const emailSuccess = (state, { payload }) => ({
  ...state,
  phoneVerifyNeed: true,
  signupLoading: false,
});

export const emailFailure = (state, { payload }) => ({
  ...state,
  phoneVerifyNeed: false,
  signupLoading: false,
  emailFailure: true,
});

export const phoneVerifyRequestRequest = (state, { payload }) => {
  return {
    ...state,
    isSentPhoneNumber: false,
  };
};

export const phoneVerifyRequestSuccess = (state, { payload }) => ({
  ...state,
  isSentPhoneNumber: true,
});

export const phoneVerifyRequestFailure = (state, { payload }) => ({
  ...state,
  isSentPhoneNumber: false,
});

export const signupConfirmRequest = (state, { payload }) => ({
  ...state,
  digicodeConfirmError: false,
});

export const signupConfirmSuccess = (state, { payload }) => ({
  ...state,
  user: payload,
  isAuthenticated: true,
  digicodeConfirmError: false,
});

export const signupConfirmFailure = (state, { payload }) => ({
  ...state,
  digicodeConfirmError: true,
});

export const authenticateRequest = (state) => ({
  ...state,
});

export const authenticateSuccess = (state, { payload }) => ({
  ...state,
});

export const authenticateFailure = (state, { payload }) => ({
  ...state,
});

export const isAuthenticatedRequest = (state) => ({
  ...state,
  isAuthenticatedLoading: true,
});

export const isAuthenticatedSuccess = (state, { payload }) => ({
  ...state,
});

export const isAuthenticatedFailure = (state) => ({
  ...state,
});

export const logoutRequest = (state) => ({
  ...state,
  error: initialState.error,
  isLoading: false,
});

export const logoutSuccess = () => ({
  ...initialState,
});

export const logoutFailure = (state, { payload }) => ({
  ...state,
  error: "Error",
  isLoading: false,
});

export const resetLoginError = (state) => ({
  ...state,
  loginError: initialState.loginError,
  isLoading: false,
});

export const loginRequest = (state, { payload }) => ({
  ...state,
  loginStatus: "PENDING",
});
export const loginSuccess = (state, { payload }) => ({
  ...state,
  user: payload,
  isAuthenticated: true,
});
export const loginFailure = (state, { payload }) => ({
  ...state,
  isAuthenticated: false,
  isAuthenticatedLoading: false,
  loginStatus: "FAILURE",
});

export const employerSignupRequest = (state) => ({
  ...state,
});

export const employerEmailVerify = (state, { payload }) => ({
  ...state,
  signupUser: payload,
  emailFailure: false,
});

export const employerEmailVerifyFailure = (state, { payload }) => ({
  ...state,
  emailFailure: true,
  signupUser: {},
});

export const employerEmailCodeSend = (state) => ({
  ...state,
  isEmailCodeError: "",
});

export const emailCodeSendFailure = (state) => ({
  ...state,
  isEmailCodeError: "6 Digit Code is Wrong!",
});

export const forgotPasswordRequest = (state) => ({
  ...state,
  loading: true,
});

export const forgotPasswordSuccess = (state) => ({
  ...state,
  loading: false,
  changepassword: "SUCCESS",
});

export const forgotPasswordFailure = (state) => ({
  ...state,
  loading: false,
  changepassword: "FAILURE",
});

export const resetPasswordRequest = (state) => ({
  ...state,
});

export const resetPasswordSuccess = (state) => ({
  ...state,
  resetPassword: "SUCCESS",
});

export const resetPasswordFailure = (state) => ({
  ...state,
  resetPassword: "FAILURE",
});

export const changePasswordRequest = (state) => ({
  ...state,
  loading: true,
  changepassword: "REQUEST",
});

export const changePasswordSuccess = (state) => ({
  ...state,
  loading: false,
  changepassword: "SUCCESS",
});

export const changePasswordFailure = (state) => ({
  ...state,
  loading: false,
  changepassword: "FAILURE",
});

export const saveVeteranCard = (state, { payload }) => ({
  ...state,
  veteranCardData: payload,
});

export const sendContactMessage = (state) => ({
  ...state,
  sendMessage: "NONE",
});

export const sendMessageSuccess = (state) => ({
  ...state,
  sendMessage: "SUCCESS",
});

export const sendMessageFailure = (state) => ({
  ...state,
  sendMessage: "FAILURE",
});

export const voterEmailConfirmRequest = (state, { payload }) => ({
  ...state,
  voterEmailValid: "REQUEST",
  isSingupUser: false,
  signupUser: payload,
  role: "voter",
});

export const voterEmailConfirmSuccess = (state) => ({
  ...state,
  voterEmailValid: "SUCCESS",
  isSingupUser: true,
});

export const voterEmailConfirmFailure = (state) => ({
  ...state,
  voterEmailValid: "FAILURE",
  isSingupUser: false,
});

export default initialState;
