
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

  INITIAL_LOADING: undefined,

  GET_SEARCH_RESULT: undefined,
  GET_SEARCH_RESULT_SUCCESS: undefined,

  SET_RETURN: undefined,
  REMOVE_FILTER: undefined,
  REMOVE_FILTER_SUCCESS: undefined,
  REMOVE_FILTER_FAILURE: undefined
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
    
    [actions.getSearchResult, handlers.getSearchResult],
    [actions.getSearchResultSuccess, handlers.getSearchResultSuccess],

    [actions.setReturn, handlers.setReturn],

    [actions.removeFilter, handlers.removeFilter],
    [actions.removeFilterSuccess, handlers.removeFilterSuccess],
    [actions.removeFilterFailure, handlers.removeFilterFailure]
  ]),
  initialState,
);

export default reducer;
