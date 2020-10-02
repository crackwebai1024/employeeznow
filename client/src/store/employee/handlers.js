
const initialState = {
  employeeData : {},
  skill: {}
};

export const getUserDataRequest = (state, {payload}) => ({
  ...state,
})

export const getUserDataSuccess = (state, {payload}) => ({
  ...state,
  employeeData : payload
})

export const loadSkillData = (state, { payload }) => ({
  ...state
})

export const updateSkillRequest = (state, { payload }) => ({
  ...state
})
export const updateSkillSuccess = (state, { payload }) => ({
  ...state,
  skill: payload
})

export default initialState;
