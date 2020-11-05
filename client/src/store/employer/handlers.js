
const initialState = {
  employerData: {},
  saveFilter: 'NONE',
  searchLoading: 'NONE',
  filterResult: [],
  return: false,
  askInterestStatus: "",
  formValues: {
    service: "", facebook: "", twitter: "", firstname: "", lastname: "",
    email: "", line1: "", line2: "", postal_code: "", city: "", country: null,
    currency: null, amount: "",
  },
  employeeData: {},
  isLimited: false
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
  saveFilter: 'REQUEST',
});

export const saveFilterSuccess = (state, { payload }) => {
  return {
    ...state,
    saveFilter: 'SUCCESS',
    searchLoading: "SUCCESS",
    filterID: payload.filterID,
    filterResult: payload.filterResult,
  }
};

export const saveFilterFailure = (state) => ({
  ...state,
  saveFilter: 'FAILURE'
});

export const getFilterListRequest = (state, { payload }) => ({
  ...state,
  searchLoading: 'NONE',
  saveFilter: 'NONE',
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
  searchLoading: "REQUEST"
})

export const searchEmployeeFailure = (state, { payload }) => ({
  ...state,
  searchLoading: "FAILURE"
})

export const searchEmployeeSuccess = (state, { payload }) => ({
  ...state,
  searchLoading: "SUCCESS",
  filterResult: payload.searchResult,
  filterID: payload.filterID
})

export const initialLoading = (state, { payload }) => ({
  ...state,
  searchLoading: "NONE",

})

export const getSearchResult = (state, { payload }) => ({
  ...state,
})

export const getSearchResultSuccess = (state, { payload }) => {
  return {
    ...state,
    filterResult: payload.searchresult,
  }
}

export const setReturn = (state) => ({
  ...state,
  return: true
})

export const removeFilter = (state) => ({
  ...state
})

export const removeFilterSuccess = (state, { payload }) => ({
  ...state,
  filter: payload,
})

export const removeFilterFailure = (state) => ({
  ...state
})

export const askInterestRequest = (state) => ({
  ...state,
  askInterestStatus: ""
})

export const askInterestSuccess = (state, { payload }) => {
  return {
    ...state,
    askInterestStatus: "SUCCESS"
  }
}

export const askInterestFailure = (state) => ({
  ...state,
  askInterestStatus: "FAILURE"
})

export const askInterestStatusHidden = (state) => ({
  ...state,
  askInterestStatus: ""
})

export const setFormValues = (state, { payload }) => ({
  ...state,
  formValues: payload
})

export const getSearchEmployee = (state, { payload }) => ({
  ...state,
})

export const getSearchEmployeeSuccess = (state, { payload }) => ({
  ...state,
  employeeData: payload
})

export const getSearchEmployeeFailure = (state, { payload }) => ({
  ...state,
})

export const purchaseRequest = (state, { payload }) => ({
  ...state,
})

export const purchaseSuccess = (state, { payload }) => ({
  ...state,
  employeeData: payload
})

export const purchaseFailure = (state, { payload }) => ({
  ...state,
})

export const purchaseLimited = (state) => ({
  ...state,
  isLimited: true,
  paid: false
})

export const payRequest = (state) => ({
  ...state,
  paid: false
})

export const paySuccess = (state, { payload }) => ({
  ...state,
  employeeData: payload,
  paid: true,
  isLimited: false
})

export const payFailure = (state) => ({
  ...state,
  paid: false,
  isLimited: false
})

export default initialState;
