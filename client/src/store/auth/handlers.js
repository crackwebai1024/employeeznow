
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
  registerError: '',
  isRegisterLoading: false,
  signupUser: {},
  phoneVerifyNeed: false,
  isSentPhoneNumber: false
};

export const signupRequest = (state, { payload }) => ({
  ...state,
  signupUser: payload,
})

export const emailSuccess = (state, { payload }) => ({
  ...state,
  phoneVerifyNeed: true
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
})

export const signupConfirmSuccess = (state, { payload }) => ({
  ...state,
  user: payload,
  isAuthenticated: true,
})

export const signupConfirmFailure = (state, { payload }) => ({
  ...state,
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

export const emailFailure = (state, { payload }) => ({
  ...state,
})

export const logoutFailure = (state, { payload }) => ({ ...state, error: "Error", isLoading: false });

export const resetLoginError = (state) => ({ ...state, loginError: initialState.loginError, isLoading: false });

export const loginRequest = (state, { payload }) => ({
  ...state
})
export const loginSuccess = (state, { payload }) => ({
  ...state,
  user: payload,
  isAuthenticated: true,
})
export const loginFailure = (state, { payload }) => ({
  ...state,
  isAuthenticated: false
})

export default initialState;
