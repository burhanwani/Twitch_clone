import { combineReducers } from 'redux';
// The redux form library already comes with a reducer named as 'reducer'. Here to avoid 
// confusion, we rename and import it as formReducer
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});