import { call, put, takeEvery } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import { deleteToken, setToken, deleteUser, deleteRole, setUserConfigured, setUser, setRole } from '@helpers/auth-helpers';
import { actions as types } from './index';
import * as  EmployerAPI from '@services/EmployerAPI';
import Axios from '@lib/axios';
import { _arrayBufferToBase64 } from '@helpers/utils';
import { setFilterID } from '@helpers/auth-helpers';

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
      setFilterID(res.data.filterID)
      const data = {
        filterID: res.data.filterID,
        filterResult: res.data.searchresult
      }
      yield put(types.saveFilterSuccess(data))
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
      let result = res.data.filters;
      let addResult = result.map(re => {
        let pos = re.systems[0]
        let reservation = re.systems[1]
        return {
          ...re, pos, reservation
        }
      })
      const data = {
        filters: addResult
      }
      yield put(types.getFilterListSuccess(data))
    }
  } catch {
    yield put(types.getFilterListFailure())
  }
}

function* onSearchEmployee({ payload }) {
  try {
    const res = yield call(EmployerAPI.onSearchEmployee, payload)
    if (res && res.data) {
      const data = {
        searchResult: res.data.searchresult,
        filterID: payload.filterID
      }
      yield put(types.searchEmployeeSuccess(data))
    }
  } catch {
    // yield put(types.searchEmployeeSuccess())
  }
}

function* onGetSearchResult({ payload }) {
  try {
    const queryString = `?filterID=${payload.filterID}`
    const res = yield call(EmployerAPI.onGetSearchResult, queryString)
    if (res && res.data) {
      yield put(types.getSearchResultSuccess(res.data.searchresult))
    }
  } catch {

  }
}

function* onRemoveFilter({ payload }) {
  try {
    const res = yield call(EmployerAPI.onRemoveFilter, payload.removeQuery)
    if (res && res.data) {
      let newFilter = payload.searchQuery.filter(filter => filter._id !== payload.removeQuery.filterID)
      const data = {
        filters : newFilter
      }
      yield put(types.removeFilterSuccess(data))
    }
  } catch {
    yield put(types.removeFilterFailure())
  }
}

const employerSagas = [
  takeEvery(types.getEmployerData, onGetEmployerData),
  takeEvery(types.saveFilterRequest, onSaveFilter),
  takeEvery(types.getFilterListRequest, onGetfilterList),
  takeEvery(types.searchEmployee, onSearchEmployee),
  takeEvery(types.getSearchResult, onGetSearchResult),
  takeEvery(types.removeFilter, onRemoveFilter),
];

export default employerSagas;
