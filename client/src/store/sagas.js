import { all, fork } from 'redux-saga/effects';

import authSagas from './auth/sagas';
import employeeSagas from './employee/sagas';
import employerSagas from './employer/sagas';

export default function* root() {
  yield all([
    ...authSagas,
    ...employeeSagas,
    ...employerSagas
  ]);
}
