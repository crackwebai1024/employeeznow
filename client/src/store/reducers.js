import { combineReducers } from 'redux';
import auth from './auth';
import employee from './employee';
import employer from './employer';
const rootReducer = combineReducers({
  auth,
  employee,
  employer
});

export default rootReducer;
