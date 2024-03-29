const initialState = {
  employeeData: {},
  skill: {},
  photo: null,
  reload: false,
  background: undefined,
  success: "",
  updateSuccess: "NONE",
  videoUpload: "NONE",
  cockTailVideo: null,
  FoodSearchResult: null,
  sortCocktail: "new",
  sortFood: "new",
};

export const initiateSuccess = (state) => ({
  ...state,
  success: "",
  updateSuccess: "NONE",
});

export const setSortCocktail = (state, { payload }) => ({
  ...state,
  sortCocktail: payload.value,
});

export const setSortFood = (state, { payload }) => ({
  ...state,
  sortFood: payload.value,
});

export const getUserDataRequest = (state, { payload }) => ({
  ...state,
});

export const getUserDocumentRequest = (state, { payload }) => ({
  ...state,
});

export const getUserDocumentSuccess = (state, { payload }) => ({
  ...state,
  [payload.type]: payload.result,
  success: true,
});

export const getUserDataSuccess = (state, { payload }) => ({
  ...state,
  employeeData: payload,
  // success: true,
});

export const loadSkillData = (state, { payload }) => ({
  ...state,
});

export const updateSkillRequest = (state, { payload }) => ({
  ...state,
  loading: true,
});
export const updateSkillSuccess = (state, { payload }) => ({
  ...state,
  skill: payload,
  loading: false,
});

export const updateJobExperience = (state, { payload }) => ({
  ...state,
  loading: true,
});

export const loadExperienceData = (state, { payload }) => ({
  ...state,
  loading: true,
});

export const success = (state, { payload }) => {
  return {
    ...state,
    loading: false,
    reload: !state.reload,
    [payload.type]: payload.data,
  };
};

export const updatePreference = (state, { payload }) => ({
  ...state,
  loading: true,
});

export const failure = (state, { payload }) => ({
  ...state,
  loading: false,
  success: false,
  videoUpload: "FAILURE",
});

export const loadPreference = (state, { payload }) => ({
  ...state,
  loading: true,
});

export const uploadProfilePhoto = (state, { payload }) => ({
  ...state,
});

export const deleteProfilePhoto = (state, { payload }) => ({
  ...state,
});

export const getProfilePhoto = (state, { payload }) => ({
  ...state,
});

export const getBackgroundImage = (state, { payload }) => ({
  ...state,
});

export const uploadPortfolioImage = (state, { payload }) => ({
  ...state,
  videoUpload: "REQUEST",
});

export const videoUploadSuccess = (state, { payload }) => ({
  ...state,
  videoUpload: "SUCCESS",
});

export const getPortfolioImage = (state, { payload }) => ({
  ...state,
});

export const deletePortfolio = (state, { payload }) => ({
  ...state,
  videoUpload: "REQUEST",
});

export const deleteFolioSuccess = (state, { payload }) => ({
  ...state,
  portfolios: state.portfolios.filter((folio) => folio.index !== payload),
  videoUpload: "SUCCESS",
});

export const uploadDocumentRequest = (state, { payload }) => {
  let loading = payload.getAll("type")[0] + "Loading";
  return {
    ...state,
    [loading]: true,
  };
};

export const uploadDocumentSuccess = (state, { payload }) => {
  let type = payload.type;
  let loading = type + "Loading";
  let content = payload.content;
  return {
    ...state,
    [type]: content,
    [loading]: false,
    success: true,
  };
};

export const updateBasicInfoRequest = (state, { payload }) => ({
  ...state,
  updateLoading: true,
  updateEmployee: false,
  updateSuccess: "REQUEST",
});

export const updateBasicInfoSuccess = (state, { payload }) => ({
  ...state,
  employeeData: {
    ...state.employeeData,
    basic: payload,
  },
  updateLoading: false,
  updateEmployee: true,
  updateSuccess: "SUCCESS",
});

export const updateBasicInfoFailure = (state) => ({
  ...state,
  updateSuccess: "FAILURE",
});

export const setSuccess = (state) => ({
  ...state,
  success: true,
});

export const uploadVeteranCard = (state, { payload }) => ({
  ...state,
});

export const uploadContestVideo = (state) => ({
  ...state,
});

export const uploadContestVideoSuccess = (state, { payload }) => ({
  ...state,
  cockTailVideo: payload,
});

export const uploadContestVideoFailure = (state, { payload }) => ({
  ...state,
});

export const getContestVideo = (state) => ({
  ...state,
});

export const getContestVideoFailure = (state, { payload }) => ({
  ...state,
});

export const deleteContestVideo = (state, { payload }) => ({
  ...state,
});

export const searchVideo = (state, { payload }) => ({
  ...state,
});

export const searchCocktailVideoSuccess = (state, { payload }) => ({
  ...state,
  cockTailSearchResult: [...payload],
});

export const searchFoodVideoSuccess = (state, { payload }) => ({
  ...state,
  FoodSearchResult: [...payload],
});

export const giveStar = (state) => ({
  ...state,
});

export default initialState;
