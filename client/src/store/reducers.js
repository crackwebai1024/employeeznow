import { combineReducers } from 'redux';
import auth from './auth';
import employee from './employee';
import employer from './employer';
import email from './email'
const rootReducer = combineReducers({
  auth,
  employee,
  employer,
  email
});

export default rootReducer;
