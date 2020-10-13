import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_EMPLOYER_DATA : undefined,
  GET_EMPLOYER_SUCCESS: undefined,
  GET_EMPLOYER_FAILURE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getEmployerData, handlers.getEmployerData],
    [actions.getEmployerSuccess, handlers.getEmployerSuccess],
    [actions.getEmployerFailure, handlers.getEmployerFailure],
  ]),
  initialState,
);

export default reducer;
