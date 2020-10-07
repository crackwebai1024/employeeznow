
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

export default initialState;
