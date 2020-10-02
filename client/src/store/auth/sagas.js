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
  const res = yield call(AuthAPI.employeeEmailVerify, data);
  if (res && res.data.success) {
    yield put(types.emailSuccess())
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
    const res = yield call(AuthAPI.signupConfirm, payload)
    if(res && res.data){
      setToken(res.data.token)
      setUser(res.data.employee)
      setRole(payload.role)
      yield put(types.signupConfirmSuccess(res.data.employee))
    }
  } catch {
    yield put(types.signupConfirmFailure())
  }
}

function* onLogin({ payload }) {
  try {
    const res = yield call(AuthAPI.onLogin, payload)
    if(res && res.data){
      setToken(res.data.token)
      setUser(res.data[payload.role])
      setRole(payload.role)
      window.location.pathname = `employees/${res.data[payload.role].slug}`
      yield put(types.loginSuccess(res.data.employee))
    }
  } catch {
    yield put(types.loginFailure())
  }
}

const authSagas = [
  takeEvery(types.loginRequest, onLogin),
  takeEvery(types.signupRequest, onEmailVerify),
  takeEvery(types.signupConfirmRequest, onSignupConfirm),
  takeEvery(types.phoneVerifyRequestRequest, onPhoneVerify),
  takeEvery(types.isAuthenticatedRequest, onIsAuthenticated),
  takeEvery(types.logoutRequest, onLogout),
];

export function* watchUnauthorized() {
  yield takeEvery((action) => /FAILURE/.test(action.type), checkAuthorization);
}

export default authSagas;
