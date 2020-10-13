import { call, put, takeEvery } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import { deleteToken, setToken, deleteUser, deleteRole, setUserConfigured, setUser, setRole } from '@helpers/auth-helpers';
import { actions, actions as types } from './index';
import * as  EmployerAPI from '@services/EmployerAPI';
import Axios from '@lib/axios';
import { _arrayBufferToBase64 } from '@helpers/utils'

function* onGetEmployerData({ payload }) {
  try {
    let queryString = `?id=${payload.id}`
    const res = yield call(EmployerAPI.getUserData, queryString)
    if (res && res.data) {
      debugger
      yield put(types.getEmployerSuccess(res.data.employer))
    }
  } catch {
    yield put(types.getEmployerFailure())
  }
}

const employerSagas = [
  takeEvery(types.getEmployerData, onGetEmployerData)
];

export default employerSagas;
