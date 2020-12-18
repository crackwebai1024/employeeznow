import { handleActions, createActions } from "redux-actions";

import initialState, * as handlers from "./handlers";

export const actions = createActions({
  INITIATE_SUCCESS: undefined,
  SET_SUCCESS: undefined,
  GET_USER_DATA_REQUEST: undefined,
  GET_USER_DATA_SUCCESS: undefined,

  GET_USER_DOCUMENT_REQUEST: undefined,
  GET_USER_DOCUMENT_SUCCESS: undefined,

  UPDATE_SKILL_REQUEST: undefined,
  UPDATE_SKILL_SUCCESS: undefined,

  LOAD_SKILL_DATA: undefined,

  UPDATE_JOB_EXPERIENCE: undefined,

  LOAD_EXPERIENCE_DATA: undefined,

  UPDATE_PREFERENCE: undefined,
  LOAD_PREFERENCE: undefined,

  SUCCESS: undefined,
  FAILURE: undefined,

  UPLOAD_PROFILE_PHOTO: undefined,
  DELETE_PROFILE_PHOTO: undefined,
  GET_PROFILE_PHOTO: undefined,
  GET_BACKGROUND_IMAGE: undefined,
  UPLOAD_PORTFOLIO_IMAGE: undefined,
  GET_PORTFOLIO_IMAGE: undefined,
  DELETE_PORTFOLIO: undefined,
  DELETE_FOLIO_SUCCESS: undefined,

  UPLOAD_DOCUMENT_REQUEST: undefined,
  UPLOAD_DOCUMENT_SUCCESS: undefined,

  UPDATE_BASIC_INFO_REQUEST: undefined,
  UPDATE_BASIC_INFO_SUCCESS: undefined,
  UPDATE_BASIC_INFO_FAILURE: undefined,

  UPLOAD_VETERAN_CARD: undefined,
  VIDEO_UPLOAD_SUCCESS: undefined,

  UPLOAD_CONTEST_VIDEO: undefined,
  UPLOAD_CONTEST_VIDEO_SUCCESS: undefined,
  UPLOAD_CONTEST_VIDEO_FAILURE: undefined,

  GET_CONTEST_VIDEO: undefined,
  GET_CONTEST_VIDEO_FAILURE: undefined,

  DELETE_CONTEST_VIDEO: undefined,

  SEARCH_COCKTAIL_VIDEO: undefined,
  SEARCH_COCKTAIL_VIDEO_SUCCESS: undefined,

  GIVE_STAR: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.giveStar, handlers.giveStar],

    [actions.uploadContestVideo, handlers.uploadContestVideo],
    [actions.uploadContestVideoSuccess, handlers.uploadContestVideoSuccess],
    [actions.uploadContestVideoFailure, handlers.uploadContestVideoFailure],

    [actions.getContestVideo, handlers.getContestVideo],
    [actions.getContestVideoFailure, handlers.getContestVideoFailure],

    [actions.searchCocktailVideo, handlers.searchCocktailVideo],
    [actions.searchCocktailVideoSuccess, handlers.searchCocktailVideoSuccess],

    [actions.deleteContestVideo, handlers.deleteContestVideo],

    [actions.initiateSuccess, handlers.initiateSuccess],
    [actions.setSuccess, handlers.setSuccess],
    [actions.getUserDataRequest, handlers.getUserDataRequest],
    [actions.getUserDataSuccess, handlers.getUserDataSuccess],

    [actions.getUserDocumentRequest, handlers.getUserDocumentRequest],
    [actions.getUserDocumentSuccess, handlers.getUserDocumentSuccess],

    [actions.loadSkillData, handlers.loadSkillData],
    [actions.updateSkillRequest, handlers.updateSkillRequest],
    [actions.updateSkillSuccess, handlers.updateSkillSuccess],

    [actions.updateJobExperience, handlers.updateJobExperience],
    [actions.loadExperienceData, handlers.loadExperienceData],

    [actions.updatePreference, handlers.updatePreference],
    [actions.loadPreference, handlers.loadPreference],

    [actions.uploadProfilePhoto, handlers.uploadProfilePhoto],
    [actions.deleteProfilePhoto, handlers.deleteProfilePhoto],
    [actions.getProfilePhoto, handlers.getProfilePhoto],
    [actions.getBackgroundImage, handlers.getBackgroundImage],
    [actions.uploadPortfolioImage, handlers.uploadPortfolioImage],
    [actions.getPortfolioImage, handlers.getPortfolioImage],

    [actions.success, handlers.success],
    [actions.failure, handlers.failure],

    [actions.deletePortfolio, handlers.deletePortfolio],
    [actions.deleteFolioSuccess, handlers.deleteFolioSuccess],

    [actions.uploadDocumentRequest, handlers.uploadDocumentRequest],
    [actions.uploadDocumentSuccess, handlers.uploadDocumentSuccess],

    [actions.updateBasicInfoRequest, handlers.updateBasicInfoRequest],
    [actions.updateBasicInfoSuccess, handlers.updateBasicInfoSuccess],
    [actions.updateBasicInfoFailure, handlers.updateBasicInfoFailure],

    [actions.uploadVeteranCard, handlers.uploadVeteranCard],

    [actions.videoUploadSuccess, handlers.videoUploadSuccess],
  ]),
  initialState
);

export default reducer;
