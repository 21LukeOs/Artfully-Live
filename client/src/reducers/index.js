import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import gallery from './gallery';
import upload from './upload';

export default combineReducers({
  alert,
  auth,
  profile,
  gallery,
  upload
});