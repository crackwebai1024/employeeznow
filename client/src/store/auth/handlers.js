
const initialState = {
  isAuthenticated: false,
  error: '',
  user: {},
  isAuthenticatedLoading: true,
  keepSignIn: false,
  isLoading: false,
  isAdmin: false,
  loginError: null,
  isLoginLoading: false,
  registered: false,
  loginStatus: null,
  registerError: '',
  isRegisterLoading: false,
  signupUser: {},
  digicodeConfirmError: false,
  longinStatus: null,
  phoneVerifyNeed: false,
  isSentPhoneNumber: false,
  isSingupUser: false,
  isEmailCodeError: ""
};

export const signupRequest = (state, { payload }) => ({
  ...state,
  signupUser: payload,
  signupLoading: true,
  isSingupUser: true,
  emailFailure: false
})

export const signupuserEmpty = (state, { payload }) => ({
  ...state,
  isSingupUser: false,
  phoneVerifyNeed: false
})

export const emailSuccess = (state, { payload }) => ({
  ...state,
  phoneVerifyNeed: true,
  signupLoading: false,
})

export const emailFailure = (state, { payload }) => ({
  ...state,
  phoneVerifyNeed: false,
  signupLoading: false,
  emailFailure: true
})

export const phoneVerifyRequestRequest = (state, { payload }) => ({
  ...state,
  isSentPhoneNumber: false
})

export const phoneVerifyRequestSuccess = (state, { payload }) => ({
  ...state,
  isSentPhoneNumber: true
})

export const phoneVerifyRequestFailure = (state, { payload }) => ({
  ...state,
  isSentPhoneNumber: false
})

export const signupConfirmRequest = (state, { payload }) => ({
  ...state,
  digicodeConfirmError: false
})

export const signupConfirmSuccess = (state, { payload }) => ({
  ...state,
  user: payload,
  isAuthenticated: true,
})

export const signupConfirmFailure = (state, { payload }) => ({
  ...state,
  digicodeConfirmError: true
})

export const authenticateRequest = (state) => ({
  ...state,

});

export const authenticateSuccess = (state, { payload }) => ({
  ...state,

});

export const authenticateFailure = (state, { payload }) => ({
  ...state,

});

export const isAuthenticatedRequest = (state) => ({ ...state, isAuthenticatedLoading: true });

export const isAuthenticatedSuccess = (state, { payload }) => ({
  ...state,

});

export const isAuthenticatedFailure = (state) => ({
  ...state,
});

export const logoutRequest = (state) => ({ ...state, error: initialState.error, isLoading: false });

export const logoutSuccess = () => ({
  ...initialState,
});

export const logoutFailure = (state, { payload }) => ({ ...state, error: "Error", isLoading: false });

export const resetLoginError = (state) => ({ ...state, loginError: initialState.loginError, isLoading: false });

export const loginRequest = (state, { payload }) => ({
  ...state,
  loginStatus: "PENDING"
})
export const loginSuccess = (state, { payload }) => ({
  ...state,
  user: payload,
  isAuthenticated: true,
})
export const loginFailure = (state, { payload }) => ({
  ...state,
  isAuthenticated: false,
  isAuthenticatedLoading: false,
  loginStatus: "FAILURE"
})

export const employerSignupRequest = (state) => ({
  ...state,
});

export const employerEmailVerify = (state, { payload }) => ({
  ...state,
  signupUser: payload,
  emailFailure: false
});

export const employerEmailVerifyFailure = (state, { payload }) => ({
  ...state,
  emailFailure: true,
  signupUser: {}
});

export const employerEmailCodeSend = (state) => ({
  ...state,
  isEmailCodeError: ""
});

export const emailCodeSendFailure = (state) => ({
  ...state,
  isEmailCodeError: "6 Digit Code is Wrong!"
});


export default initialState;
