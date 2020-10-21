
const initialState = {
  employerData: {},
  saveFilter : 'NONE',
  searchLoading: 'NONE'
};

export const getEmployerData = (state) => ({
  ...state,
});

export const getEmployerSuccess = (state, { payload }) => {
  return {
    ...state,
    employerData: payload,
  }
};

export const getEmployerFailure = (state) => ({
  ...state,
  // get employer data failed.
});

export const saveFilterRequest = (state) => ({
  ...state,
  saveFilter : 'NONE',
});

export const saveFilterSuccess = (state, { payload }) => ({
  ...state,
  saveFilter : 'SUCCESS'
});

export const saveFilterFailure = (state) => ({
  ...state,
  saveFilter: 'FAILURE'
});

export const getFilterListRequest = (state, { payload }) => ({
  ...state,
  searchLoading: 'NONE'
});

export const getFilterListSuccess = (state, { payload }) => ({
  ...state,
  filter: payload,
});

export const getFilterListFailure = (state, { payload }) => ({
  ...state,
});

export const searchEmployee = (state, { payload }) => ({
  ...state,
  searchLoading : "REQUEST"
})

export const searchEmployeeFailure = (state, { payload }) => ({
  ...state,
  searchLoading: "FAILURE"
})

export const searchEmployeeSuccess = (state, { payload }) => ({
  ...state,
  searchLoading: "SUCCESS"
})

export const initialLoading = (state, { payload }) => ({
  ...state,
  searchLoading: "NONE"
})

export default initialState;
