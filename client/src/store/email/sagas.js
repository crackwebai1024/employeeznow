import { call, put, takeEvery } from "redux-saga/effects";
import { actions, actions as types } from "./index";
import * as EmailAPI from "@services/EmailAPI";

function* onSendInterest({ payload }) {
  try {
    const res = yield call(EmailAPI.onSendInterest, payload)
    if(res && res.data) {
      yield put(types.sendInterestSuccess())
    }
  } catch {
    yield put(types.sendInterestFailure())
  }
}

function* onSendNoInterest({ payload }) {
  try {
    const res = yield call(EmailAPI.onSendNoInterest, payload)
    if(res && res.data) {
      yield put(types.sendNoInterestSuccess())
    }
  } catch {
    yield put(types.sendNoInterestFailure())
  }
}

const emailSagas = [
  takeEvery(types.sendInterestRequest, onSendInterest),
  takeEvery(types.sendNoInterestRequest, onSendNoInterest)
]

export default emailSagas;