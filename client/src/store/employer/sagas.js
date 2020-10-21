import { call, put, takeEvery } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import { deleteToken, setToken, deleteUser, deleteRole, setUserConfigured, setUser, setRole } from '@helpers/auth-helpers';
import { actions as types } from './index';
import * as  EmployerAPI from '@services/EmployerAPI';
import Axios from '@lib/axios';
import { _arrayBufferToBase64 } from '@helpers/utils'

function* onGetEmployerData({ payload }) {
  try {
    let queryString = `?id=${payload.id}`
    const res = yield call(EmployerAPI.getUserData, queryString)
    if (res && res.data) {
      yield put(types.getEmployerSuccess(res.data.employer))
    }
  } catch {
    yield put(types.getEmployerFailure())
  }
}

function* onSaveFilter({ payload }) {
  try {
    const res = yield call(EmployerAPI.onSaveFilter, payload)
    if (res && res.data) {
      yield put(types.saveFilterSuccess())
    }
  } catch {
    yield put(types.saveFilterFailure())
  }
}

function* onGetfilterList({ payload }) {
  try {
    const queryString = `?id=${payload.id}`
    const res = yield call(EmployerAPI.onGetfilterList, queryString)
    if (res && res.data) {
      yield put(types.getFilterListSuccess(res.data))
    }
  } catch {
    yield put(types.getFilterListFailure())
  }
}

function* onSearchEmployee({ payload }) {
  // try {
  //   const res = yield call(EmployerAPI.onSearchEmployee())
  //   if (res && res.data) {
  //     yield put(types.searchEmployeeSuccess())
  //   }
  // } catch {
    yield put(types.searchEmployeeSuccess())
  // }
}


const employerSagas = [
  takeEvery(types.getEmployerData, onGetEmployerData),
  takeEvery(types.saveFilterRequest, onSaveFilter),
  takeEvery(types.getFilterListRequest, onGetfilterList),
  takeEvery(types.searchEmployee, onSearchEmployee)

];

export default employerSagas;
