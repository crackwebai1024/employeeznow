import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_USER_DATA_REQUEST: undefined,
  GET_USER_DATA_SUCCESS: undefined,

  UPDATE_SKILL_REQUEST : undefined,
  UPDATE_SKILL_SUCCESS : undefined,

  LOAD_SKILL_DATA : undefined
});

const reducer = handleActions(
  new Map([
    [actions.getUserDataRequest, handlers.getUserDataRequest],
    [actions.getUserDataSuccess, handlers.getUserDataSuccess],
    
    [actions.loadSkillData, handlers.loadSkillData],
    [actions.updateSkillRequest, handlers.updateSkillRequest],
    [actions.updateSkillSuccess, handlers.updateSkillSuccess],
    
  ]),
  initialState,
);

export default reducer;
