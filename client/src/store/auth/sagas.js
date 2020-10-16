import { call, put, takeEvery } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import { deleteToken, setToken, deleteUser, deleteRole, setUserConfigured, setUser, setRole } from '@helpers/auth-helpers';
import { actions, actions as types } from './index';
import * as  AuthAPI from '@services/AuthAPI';

function* onAuthenticate({ payload }) {

}

function* onIsAuthenticated() {

}

function* onLogout() {
  yield put(types.logoutSuccess())
  deleteToken()
  deleteRole()
  deleteUser()
}

function* checkAuthorization({ payload }) {
  const error = (payload && payload.error) || payload;
  if ((error && error.response && error.response.status === 401) || error.message === 'Unauthorized') {
    yield* onLogout();
  }
}

function* onEmailVerify({ payload }) {
  const data = payload
  try {
    const res = yield call(AuthAPI.employeeEmailVerify, data);
    if (res && res.data.success) {
      yield put(types.emailSuccess())
    }
  } catch {
    yield put(types.emailFailure())
  }
}

function* onPhoneVerify({ payload }) {
  const res = yield call(AuthAPI.phoneVerifyRequest, payload)
  try {
    if (res && res.data.success)
      yield put(types.phoneVerifyRequestSuccess())
  } catch {
    // yield put(types.phoneVerifyRequestSuccess)
    return
  }
  // yield put(types.phoneVerifyRequestFailure)
}

function* onSignupConfirm({ payload }) {
  try {
    const res = yield call(AuthAPI.signupConfirm, payload.confirmData)
    if (res && res.data) {
      setToken(res.data.token)
      setUser(res.data.employee)
      setRole(payload.confirmData.role)
      
      let data = payload.veteranCardData
      data.append("id", res.data.employee._id)
      data.append("role", payload.confirmData.role)
      
      const response = yield call(AuthAPI.onUploadVeteranCard, data)
      window.location.pathname = `employees/${res.data[payload.confirmData.role].slug}`
      yield put(types.signupConfirmSuccess(res.data.employee))
    }
  } catch {
    yield put(types.signupConfirmFailure())
  }
}

function* onLogin({ payload }) {
  try {
    const res = yield call(AuthAPI.onLogin, payload)
    if (res && res.data) {
      setToken(res.data.token)
      setUser(res.data[payload.role])
      setRole(payload.role)
      if (payload.role == "employee") {
        window.location.pathname = `employees/${res.data[payload.role].slug}`
      } else if (payload.role == "employer") {
        window.location.pathname = `employers/${res.data[payload.role].slug}`
      }
      yield put(types.loginSuccess(res.data.employee))
    }
  } catch {
    yield put(types.loginFailure())
  }
}

function* onEmployerSignup({ payload }) {
  try {
    let data = {
      email: payload.email
    }
    const res = yield call(AuthAPI.EmployerSendCode, data)
    if (res && res.data) {
      yield put(types.employerEmailVerify(payload))
    }
  } catch {
    yield put(types.employerEmailVerifyFailure())
  }
}

function* onEmailCodeSend({ payload }) {
  try {
    const res = yield call(AuthAPI.onEmployerSignup, payload)
    if (res && res.data) {
      setToken(res.data.token)
      setUser(res.data.employer)
      setRole(payload.role)
      window.location.pathname = `employers/${res.data[payload.role].slug}`
      yield put(types.signupConfirmSuccess(res.data.employer))
    }
  } catch {
    yield put(types.emailCodeSendFailure())
  }
}

function* onForgotPassword({ payload }) {
  try {
    const res = yield call(AuthAPI.onForgotPassword, payload)
    if(res && res.data) {
      yield put(types.forgotPasswordSuccess())
    }
  } catch {
    yield put(types.forgotPasswordFailure())
  }
}

function* onResetPassword({ payload }) {
  try {
    const res = yield call(AuthAPI.onResetPassword, payload)
    if(res && res.data) {
      yield put(types.resetPasswordSuccess())
    }
  } catch {
    yield put(types.resetPasswordFailure())
  }
}

const authSagas = [
  takeEvery(types.loginRequest, onLogin),
  takeEvery(types.signupRequest, onEmailVerify),
  takeEvery(types.signupConfirmRequest, onSignupConfirm),
  takeEvery(types.phoneVerifyRequestRequest, onPhoneVerify),
  takeEvery(types.isAuthenticatedRequest, onIsAuthenticated),
  takeEvery(types.logoutRequest, onLogout),
  takeEvery(types.employerSignupRequest, onEmployerSignup),
  takeEvery(types.employerEmailCodeSend, onEmailCodeSend),
  takeEvery(types.forgotPasswordRequest, onForgotPassword),
  takeEvery(types.resetPasswordRequest, onResetPassword),
];

export function* watchUnauthorized() {
  yield takeEvery((action) => /FAILURE/.test(action.type), checkAuthorization);
}

export default authSagas;
