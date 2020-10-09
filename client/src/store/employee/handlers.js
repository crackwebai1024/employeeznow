
const initialState = {
  employeeData: {},
  skill: {},
  photo: null,
  reload: false,
  background: undefined
};

export const getUserDataRequest = (state, { payload }) => ({
  ...state,
})

export const getUserDocumentRequest = (state, { payload }) => ({
  ...state,
})

export const getUserDocumentSuccess = (state, { payload }) => ({
  ...state,
})

export const getUserDataSuccess = (state, { payload }) => ({
  ...state,
  employeeData: payload
})

export const loadSkillData = (state, { payload }) => ({
  ...state
})

export const updateSkillRequest = (state, { payload }) => ({
  ...state,
  loading: true
})
export const updateSkillSuccess = (state, { payload }) => ({
  ...state,
  skill: payload,
  loading: false
})

export const updateJobExperience = (state, { payload }) => ({
  ...state,
  loading: true
})

export const loadExperienceData = (state, { payload }) => ({
  ...state,
  loading: true
})

export const success = (state, { payload }) => {
  return {
    ...state,
    loading: false,
    reload: !state.reload,
    [payload.type]: payload.data
  }
}

export const updatePreference = (state, { payload }) => ({
  ...state,
  loading: true
})

export const failure = (state, { payload }) => ({
  ...state,
  loading: false
})

export const loadPreference = (state, { payload }) => ({
  ...state,
  loading: true
})

export const uploadProfilePhoto = (state, { payload }) => ({
  ...state,
})

export const getProfilePhoto = (state, { payload }) => ({
  ...state,
})

export const getBackgroundImage = (state, { payload }) => ({
  ...state,
})

export const uploadPortfolioImage = (state, { payload }) => ({
  ...state,
})

export const getPortfolioImage = (state, { payload }) => ({
  ...state,
})

export const deletePortfolio = (state, { payload }) => ({
  ...state,
})

export const deleteFolioSuccess = (state, { payload }) => ({
  ...state,
  portfolios: state.portfolios.filter(folio => folio.index !== payload)
})

export const uploadDocumentRequest = (state, { payload }) => {
  let loading = payload.getAll('type')[0] + "Loading"
  return {
    ...state,
    [loading]: true
  }
}

export const uploadDocumentSuccess = (state, { payload }) => {
  let type = payload.type
  let loading = type + "Loading"
  let content = payload.content
  return {
    ...state,
    [type]: content,
    [loading]: false,
  }
}

export const updateBasicInfoRequest = (state, { payload }) => ({
  ...state,
  updateLoading: true,
  updateEmployee: false
})

export const updateBasicInfoSuccess = (state, { payload }) => ({
  ...state,
  employeeData: {
    ...state.employeeData,
    basic: payload
  },
  updateLoading: false,
  updateEmployee: true
})

export default initialState;
