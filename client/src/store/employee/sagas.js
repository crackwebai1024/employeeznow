import { call, put, takeEvery } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import { deleteToken, setToken, deleteUser, deleteRole, setUserConfigured, setUser, setRole } from '@helpers/auth-helpers';
import { actions, actions as types } from './index';
import * as  EmployeeAPI from '@services/EmployeeAPI';

function* getUserData({ payload }) {
  try {
    let queryString = `?id=${payload.id}`
    const res = yield call(EmployeeAPI.getUserData, queryString)
    if (res && res.data) {
      yield put(types.getUserDataSuccess(res.data))
    }
  } catch {

  }
}

function* onLoadSkill({ payload }) {
  try {
    let queryString = `?id=${payload.id}`
    const res = yield call(EmployeeAPI.loadSkill, queryString)
    if(res && res.data) {
      yield put(types.updateSkillSuccess(res.data.skill))
      console.log(res.data.skill, "payload---")
    }
  } catch {

  }
}

function* onUpdateSkill({ payload }) {
  try {
    const res = yield call(EmployeeAPI.updateSkill, payload)
    if(res && res.data) {
      yield put(types.updateSkillSuccess(payload))
    }
  } catch {

  }
}

const employeeSagas = [
  takeEvery(types.getUserDataRequest, getUserData),
  takeEvery(types.loadSkillData, onLoadSkill),
  takeEvery(types.updateSkillRequest, onUpdateSkill),
];


export default employeeSagas;
