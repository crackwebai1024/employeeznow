import { all } from "redux-saga/effects";

import authSagas from "./auth/sagas";
import employeeSagas from "./employee/sagas";
import employerSagas from "./employer/sagas";
import emailSagas from "./email/sagas";

export default function* root() {
  yield all([...authSagas, ...employeeSagas, ...employerSagas, ...emailSagas]);
}
