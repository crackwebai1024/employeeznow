import { combineReducers } from 'redux';
import auth from './auth';
import employee from './employee'
const rootReducer = combineReducers({
  auth,
  employee
});

export default rootReducer;
