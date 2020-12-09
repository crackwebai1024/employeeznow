import { call, put, take, takeEvery } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import { deleteToken, setToken, deleteUser, deleteRole, setUserConfigured, setUser, setRole } from '@helpers/auth-helpers';
import { actions as types } from './index';
import * as  EmployerAPI from '@services/EmployerAPI';
import Axios from '@lib/axios';
import { successMessage, errorMessage } from '@helpers/utils';
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
        filters: newFilter
      }
      yield put(types.removeFilterSuccess(data))
    }
  } catch {
    yield put(types.removeFilterFailure())
  }
}

function* onAskInterest({ payload }) {
  try {
    const res = yield call(EmployerAPI.onAskInterest, payload)
    if (res && res.data) {
      yield put(types.askInterestSuccess(res.data.message))
    }
  } catch {
    yield put(types.askInterestFailure())
  }
}

function* onGetSearchEmployee({ payload }) {
  try {
    const queryString = `?id=${payload.id}&employeeID=${payload.employeeID}`
    const res = yield call(EmployerAPI.onGetEmployerData, queryString)
    if (res && res.data) {
      yield put(types.getSearchEmployeeSuccess(res.data))
    }
  } catch {
    yield put(types.getSearchEmployeeFailure())
  }
}

function* onPurhcaseEmployee({ payload }) {
  try {
    const res = yield call(EmployerAPI.onPurhcaseEmployee, payload)
    if (res && res.data) {
      const employeeData = res.data
      if (res.data.islimit) {
        yield put(types.purchaseLimited())
      } else {
        yield put(types.purchaseSuccess(employeeData))
      }
    }
  } catch {
    yield put(types.purchaseFailure())
  }
}

function* onPayRequest({ payload }) {
  try {
    const res = yield call(EmployerAPI.onPayRequest, payload)
    if (res && res.data) {
      yield put(types.paySuccess(res.data))
    }
  } catch {
    yield put(types.payFailure())
  }
}

function* onUpdateEmployer({ payload }) {
  try {
    const res = yield call(EmployerAPI.onUpdateEmployer, payload)
    if (res && res.data) {

    }
  } catch {

  }
}

function* onAddToCart({ payload }) {
  try {
    const res = yield call(EmployerAPI.onAddToCart, payload)
    if (res && res.data) {
      yield put(types.addToCartSuccess(payload.employeeID))
      // yield put(types.updateCartItems(payload.employeeID))
    }
  } catch {
    yield put(types.addToCartFailure())
  }
}

function* onLoadCartList({ payload }) {
  try {
    const queryString = `?id=${payload.id}`
    const res = yield call(EmployerAPI.onLoadCartList, queryString)
    if (res && res.data) {
      yield put(types.loadCartListSuccess(res.data))
    }
  } catch {

  }
}

function* onChargeRequest({ payload }) {
  try {
    let purchasenum = undefined;
    switch (payload.purchasenum) {
      case 'BUY_10':
        purchasenum = 10;
        break;
      case 'BUY_20':
        purchasenum = 20;
        break;
      case 'BUY_50':
        purchasenum = 50;
        break;
      case 'BUY_SELECT':
        purchasenum = payload.employees.length
        break;
    }

    let freeRes = undefined
    if (payload.purchasenum === "BUY_SELECT") {
      let freeData = {
        id: payload.id,
        employees: payload.employees.splice(0, payload.employees.length - payload.buyCount)
      }
      freeRes = yield put(types.freePurchase(freeData))
    }

    if (freeRes) {
      let data = {
        employees: payload.employees,
        id: payload.id,
        token: payload.token,
        purchasenum: purchasenum
      }
      const res = yield call(EmployerAPI.onChargeRequest, data)
      if (res && res.data) {
        yield put(types.chargeSuccess(res.data))
      }
    }
  } catch {
    yield put(types.chargeFailure())
  }
}

function* onRemoveCart({ payload }) {
  try {
    const res = yield call(EmployerAPI.onRemoveCart, payload)
    if (res && res.data) {
      yield put(types.removeCartSuccess(res.data.cartItems))
      successMessage('Success')
    }
  } catch {

  }
}

function* onFreePurchase({ payload }) {
  try {
    const res = yield call(EmployerAPI.onFreePurchase, payload)
    if (res && res.data) {
      yield put(types.chargeSuccess(res.data))
    }
  } catch {

  }
}

function* onGetPurchasedEmployees({ payload }) {
  try {
    let queryString = `?id=${payload.id}`
    const res = yield call(EmployerAPI.onGetPurchasedEmployees, queryString)
    if(res && res.data) {
      yield put(types.setPurchasedEmployees(res.data))
    }
  } catch {

  }
}

const employerSagas = [
  takeEvery(types.getEmployerData, onGetEmployerData),
  takeEvery(types.updateEmployerAccount, onUpdateEmployer),
  takeEvery(types.saveFilterRequest, onSaveFilter),
  takeEvery(types.getFilterListRequest, onGetfilterList),
  takeEvery(types.searchEmployee, onSearchEmployee),
  takeEvery(types.getSearchResult, onGetSearchResult),
  takeEvery(types.removeFilter, onRemoveFilter),
  takeEvery(types.askInterestRequest, onAskInterest),
  takeEvery(types.getSearchEmployee, onGetSearchEmployee),
  takeEvery(types.purchaseRequest, onPurhcaseEmployee),
  takeEvery(types.payRequest, onPayRequest),
  takeEvery(types.addToCartRequest, onAddToCart),
  takeEvery(types.loadCartList, onLoadCartList),
  takeEvery(types.chargeRequest, onChargeRequest),
  takeEvery(types.removeCart, onRemoveCart),
  takeEvery(types.freePurchase, onFreePurchase),
  takeEvery(types.getPurchaseEmployees, onGetPurchasedEmployees)
];

export default employerSagas;
