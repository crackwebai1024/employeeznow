import { call, put, takeEvery } from "redux-saga/effects";

import { actions as types } from "./index";
import * as EmployeeAPI from "@services/EmployeeAPI";
import {
  _arrayBufferToBase64,
  errorMessage,
  successMessage,
  objectSort,
} from "@helpers/utils";

function* getUserData({ payload }) {
  try {
    let queryString = `?id=${payload.id}`;
    if (payload.employeeID) {
      queryString += `&employeeID=${payload.employeeID}`;
    }
    const res = yield call(EmployeeAPI.getUserData, queryString);
    if (res && res.data) {
      yield put(types.getUserDataSuccess(res.data));
      yield put(types.initiateSuccess());
    }
  } catch {}
}

function* onLoadSkill({ payload }) {
  try {
    let queryString = `?id=${payload.id}`;
    const res = yield call(EmployeeAPI.loadSkill, queryString);
    if (res && res.data) {
      yield put(types.updateSkillSuccess(res.data.skill));
      yield put(types.initiateSuccess());
    }
  } catch {}
}

function* onUpdateSkill({ payload }) {
  try {
    const res = yield call(EmployeeAPI.updateSkill, payload);
    if (res && res.data) {
      successMessage("Saving Success!");
      yield put(types.updateSkillSuccess(payload));
      yield put(types.setSuccess());
    }
  } catch {
    errorMessage("Saving Failed!");
  }
}

function* onUpdateJobExperience({ payload }) {
  try {
    const res = yield call(EmployeeAPI.updateJobExperience, payload);
    if (res && res.data) {
      // window.location.href = `/employees/${user.slug}`;
      successMessage("Succefully Saved!");
      yield put(types.success({ type: "experience", data: res.data }));
      yield put(types.setSuccess());
    }
  } catch {
    yield put(types.failure);
    errorMessage("Saving is failed!");
  }
}

function* onLoadJobExperience({ payload }) {
  try {
    let queryString = `?id=${payload.id}`;
    const res = yield call(EmployeeAPI.loadExperienceData, queryString);
    if (res && res.data) {
      yield put(types.success({ type: "experience", data: res.data }));
      yield put(types.initiateSuccess());
    }
  } catch {
    yield put(types.failure);
  }
}

function* onUpdatePreference({ payload }) {
  try {
    const res = yield call(EmployeeAPI.updatePreference, payload);
    if (res && res.data) {
      yield put(
        types.success({ type: "preference", data: { preference: res.data } })
      );
      yield put(types.setSuccess());
      successMessage("Saving Success!");
    }
  } catch {
    yield put(types.failure);
    errorMessage("Saving Failed!");
  }
}

function* onLoadPreference({ payload }) {
  try {
    let queryString = `?id=${payload.id}`;
    const res = yield call(EmployeeAPI.loadPreference, queryString);
    if (res && res.data) {
      yield put(types.success({ type: "preference", data: res.data }));
      yield put(types.initiateSuccess());
    }
  } catch {}
}

function* onUploadPhoto({ payload }) {
  try {
    const res = yield call(EmployeeAPI.uploadProfilePhoto, payload.formData);
    if (res && res.data) {
      let photo = res.data[payload.photoType];
      yield put(
        types.success({ type: payload.photoType, success: true, data: photo })
      );
    }
  } catch {}
}

function* onDeletePhoto({ payload }) {
  try {
    const res = yield call(EmployeeAPI.deleteProfilePhoto, payload.formData);
    if (res) {
      yield put(types.success({ type: payload.photoType, data: "" }));
    }
  } catch {}
}

function* onGetProfilePhoto({ payload }) {
  try {
    let queryString = `?id=${payload.id}&type=${payload.type}`;
    const res = yield call(EmployeeAPI.getProfilePhoto, queryString);
    if (res && res.data) {
      // let photo = _arrayBufferToBase64(res.data.content.Body.data);
      yield put(types.success({ type: payload.type, data: res.data }));
    }
  } catch {
    yield put(types.failure());
  }
}

function* onGetBackground({ payload }) {
  try {
    let queryString = `?id=${payload.id}&type=${payload.type}`;
    const res = yield call(EmployeeAPI.getBackgroundImage, queryString);
    if (res && res.data) {
      const photo = res.data;
      yield put(types.success({ type: payload.type, data: photo }));
    }
  } catch {
    yield put(types.failure());
  }
}

function* onUploadPortfolio({ payload }) {
  try {
    const res = yield call(EmployeeAPI.uploadPortfolioImage, payload.formData);
    if (res && res.data) {
      yield put(types.videoUploadSuccess());
      yield put(types.getPortfolioImage(payload));
    }
  } catch {
    yield put(types.failure());
  }
}

function* onGetPortfolio({ payload }) {
  try {
    let queryString = `?id=${payload.id}`;
    const res = yield call(EmployeeAPI.getPortfolioImage, queryString);
    if (res && res.data) {
      let portfolios = res.data.portfolio.portfolios;
      portfolios.reverse();
      yield put(types.success({ type: "portfolios", data: portfolios }));
    }
  } catch {}
}

function* onDeleteFolio({ payload }) {
  try {
    const res = yield call(EmployeeAPI.deleteFolio, payload);
    if (res && res.data) {
      yield put(types.deleteFolioSuccess(payload.folioID));
    }
  } catch {}
}

function* onUploadDocument({ payload }) {
  try {
    const res = yield call(EmployeeAPI.uploadDocument, payload);
    if (res && res.data) {
      yield put(
        types.uploadDocumentSuccess({
          content: _arrayBufferToBase64(res.data.content.data),
          type: payload.getAll("type")[0],
        })
      );
    }
  } catch {}
}

function* onGetUserDocument({ payload }) {
  try {
    let { id, type } = payload;
    const queryString = `?id=${id}&type=${type}`;
    const res = yield call(EmployeeAPI.onGetUserDocument, queryString);
    if (res && res.data) {
      let result = _arrayBufferToBase64(res.data.content.Body.data);
      yield put(types.getUserDocumentSuccess({ result, type: "veteranCard" }));
    }
  } catch {}
}

function* onUpdateBasicInfo({ payload }) {
  try {
    const res = yield call(EmployeeAPI.updateBasicInfo, payload);
    if (res && res.data) {
      console.log(res.data);
      yield put(types.updateBasicInfoSuccess(res.data));
      window.location.reload();
    }
  } catch {
    yield put(types.updateBasicInfoFailure());
  }
}

function* onUploadVeteranCard({ payload }) {
  try {
    const res = yield call(EmployeeAPI.uploadDocument, payload);
    if (res && res.data) {
      let result = _arrayBufferToBase64(res.data.content.data);
      yield put(types.getUserDocumentSuccess({ result, type: "veteranCard" }));
    }
  } catch {}
}

function* onContestVideoUpload({ payload }) {
  try {
    const res = yield call(EmployeeAPI.contestVideoUpload, payload);
    if (res && res.data) {
      window.location.reload();
      yield put(types.uploadContestVideoSuccess(res.data));
    }
  } catch {}
}

function* onGetContestVideo({ payload }) {
  try {
    let queryString = `/${payload.id}?type=${payload.type}`;
    const res = yield call(EmployeeAPI.onGetContestVideo, queryString);
    if (res && res.data) {
      yield put(types.uploadContestVideoSuccess(res.data.video));
    }
  } catch {}
}

function* onDeleteContestVideo({ payload }) {
  try {
    const res = yield call(EmployeeAPI.onDeleteContestVideo, payload);
    if (res && res.data) {
      yield put(types.uploadContestVideoSuccess(null));
    }
  } catch {}
}

function* onSearchVideo({ payload }) {
  try {
    const res = yield call(EmployeeAPI.onSearchCocktailVideo, payload);
    if (res && res.data) {
      let newArray = [];
      newArray = objectSort(res.data, payload.sort);
      if (payload.type === "cocktail") {
        yield put(types.searchCocktailVideoSuccess(newArray));
      } else if (payload.type === "food") {
        yield put(types.searchFoodVideoSuccess(newArray));
      }
    }
  } catch {}
}

function* onGiveStar({ payload }) {
  const res = yield call(EmployeeAPI.onGiveStar, payload);
}

function* onSortCocktail({ payload }) {
  let newArray = [];
  newArray = objectSort(payload.data, payload.value);

  yield put(types.searchCocktailVideoSuccess(newArray));
}

function* onSortFood({ payload }) {
  let newArray = [];
  newArray = objectSort(payload.data, payload.value);
  yield put(types.searchFoodVideoSuccess(newArray));
}

const employeeSagas = [
  takeEvery(types.getUserDataRequest, getUserData),
  takeEvery(types.loadSkillData, onLoadSkill),
  takeEvery(types.updateSkillRequest, onUpdateSkill),
  takeEvery(types.updateJobExperience, onUpdateJobExperience),
  takeEvery(types.loadExperienceData, onLoadJobExperience),
  takeEvery(types.updatePreference, onUpdatePreference),
  takeEvery(types.loadPreference, onLoadPreference),
  takeEvery(types.uploadProfilePhoto, onUploadPhoto),
  takeEvery(types.deleteProfilePhoto, onDeletePhoto),
  takeEvery(types.getProfilePhoto, onGetProfilePhoto),
  takeEvery(types.getBackgroundImage, onGetBackground),
  takeEvery(types.uploadPortfolioImage, onUploadPortfolio),
  takeEvery(types.getPortfolioImage, onGetPortfolio),
  takeEvery(types.deletePortfolio, onDeleteFolio),
  takeEvery(types.uploadDocumentRequest, onUploadDocument),
  takeEvery(types.getUserDocumentRequest, onGetUserDocument),
  takeEvery(types.updateBasicInfoRequest, onUpdateBasicInfo),
  takeEvery(types.uploadVeteranCard, onUploadVeteranCard),
  takeEvery(types.uploadContestVideo, onContestVideoUpload),
  takeEvery(types.getContestVideo, onGetContestVideo),
  takeEvery(types.deleteContestVideo, onDeleteContestVideo),
  takeEvery(types.searchVideo, onSearchVideo),
  takeEvery(types.giveStar, onGiveStar),
  takeEvery(types.setSortCocktail, onSortCocktail),
  takeEvery(types.setSortFood, onSortFood),
];

export default employeeSagas;
