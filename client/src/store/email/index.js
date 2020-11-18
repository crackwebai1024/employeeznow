import { handleActions, createActions } from "redux-actions";

import initialState, * as handlers from "./handlers";

export const actions = createActions({
  SEND_INTEREST_REQUEST: undefined,
  SEND_INTEREST_SUCCESS: undefined,
  SEND_INTEREST_FAILURE: undefined,

  SEND_NO_INTEREST_REQUEST: undefined,
  SEND_NO_INTEREST_SUCCESS: undefined,
  SEND_NO_INTEREST_FAILURE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.sendInterestRequest, handlers.sendInterestRequest],
    [actions.sendInterestSuccess, handlers.sendInterestSuccess],
    [actions.sendInterestFailure, handlers.sendInterestFailure],

    [actions.sendNoInterestRequest, handlers.sendNoInterestRequest],
    [actions.sendNoInterestSuccess, handlers.sendNoInterestSuccess],
    [actions.sendNoInterestFailure, handlers.sendNoInterestFailure],
    
  ]),
  initialState
)

export default reducer;
