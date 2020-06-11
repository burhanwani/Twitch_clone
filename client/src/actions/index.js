import {
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STREAM, 
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';
import streams from '../apis/streams';

export const signIn = userId => {
    return {
      type: SIGN_IN,
      payload: userId
    };
  };
  
  export const signOut = () => {
    return {
      type: SIGN_OUT
    };
  };
// Remember an action creator either needs to return a object with type and payload properties or it can call 
// the dispatch function directly. Need to use reduxThunk and pass it to applyMiddleware for this purpose
// We also need to store the userId of the creator of the stream in the backend. We can call getState function to get
// the state object and then retreive the userId from it and post it to the api. 
// An action creator alwasy has access to the dispatch function and the state object through the getState function.  
export const createStream = formValues => async (dispatch, getState) => {
        const {userId} = getState().auth;
        //When POSTing a new stream to the api server, we get the id of the stream in response 
        // which we would want to store somewhere. We will call the dispatch function again on an action creator
        // to save the id
        // For path, refer to json-server api details. https://github.com/typicode/json-server
        const response = await streams.post('/streams', {...formValues, userId});
        //console.log(response.data)
        dispatch({type: CREATE_STREAM, payload: response.data});
};

  
  export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
  
    dispatch({ type: FETCH_STREAMS, payload: response.data });
  };
  
  export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
  
    dispatch({ type: FETCH_STREAM, payload: response.data });
  };
  
  export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
  
    dispatch({ type: EDIT_STREAM, payload: response.data });
    //history.push('/');
  };
  
  export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);
  // Note the id is the whole payload
    dispatch({ type: DELETE_STREAM, payload: id });
    //history.push('/');
  };