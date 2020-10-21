
import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_USER_DATA_REQUEST: undefined,

  GET_EMPLOYER_DATA: undefined,
  GET_EMPLOYER_SUCCESS: undefined,
  GET_EMPLOYER_FAILURE: undefined,

  SAVE_FILTER_REQUEST: undefined,
  SAVE_FILTER_SUCCESS: undefined,
  SAVE_FILTER_FAILURE: undefined,

  GET_FILTER_LIST_REQUEST: undefined,
  GET_FILTER_LIST_SUCCESS: undefined,
  GET_FILTER_LIST_FAILURE: undefined,

  SEARCH_EMPLOYEE: undefined,
  SEARCH_EMPLOYEE_SUCCESS: undefined,

  INITIAL_LOADING: undefined
});

const reducer = handleActions(
  new Map([
    [actions.getEmployerData, handlers.getEmployerData],
    [actions.getEmployerSuccess, handlers.getEmployerSuccess],
    [actions.getEmployerFailure, handlers.getEmployerFailure],
    
    [actions.saveFilterRequest, handlers.saveFilterRequest],
    [actions.saveFilterSuccess, handlers.saveFilterSuccess],
    [actions.saveFilterFailure, handlers.saveFilterFailure],

    [actions.getFilterListRequest, handlers.getFilterListRequest],
    [actions.getFilterListSuccess, handlers.getFilterListSuccess],
    [actions.getFilterListFailure, handlers.getFilterListFailure],

    [actions.searchEmployee, handlers.searchEmployee],
    [actions.searchEmployeeSuccess, handlers.searchEmployeeSuccess],
    
    [actions.initialLoading, handlers.initialLoading],
    
  ]),
  initialState,
);

export default reducer;
