import { combineReducers } from 'redux';
import dragReducer from './drag/reducer';
import authReducer from './auth/reducer';
const rootReducer = combineReducers({
  auth: authReducer,
  drag: dragReducer
});
export default rootReducer;