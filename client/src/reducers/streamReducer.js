import _ from 'lodash';
import {
    CREATE_STREAM, 
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
  } from '../actions/types';



  // We are maintaining the state as an object containing the streams as key value pairs, the key being
  // the userid and the value being the stream object.
  // The response from the api server follows resftful conventions :
  // Action                   Method          Route               Response
//   update a record           PUT            /streams/:id        Single Record
//   Create Record            POST            /streams            Single Record
//  List all records          GET             /streams            List of Records
// Delete a record            DELETE          /streams/:id        Nothing
// Get one particular rec     GET             /streams/:id        Single Record         
  export default (state = { }, action) => {
    switch (action.type) {
      case CREATE_STREAM:
        //key interpolation syntax. This is equivalent to:
        // const new_state = {...state};
        // new_state[action.payload.id] = action.payload;
        // return new_state;
        return { ...state, [action.payload.id]: action.payload };
      case FETCH_STREAM:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_STREAM:
        return { ...state, [action.payload.id]: action.payload };
      case FETCH_STREAMS:
        // We get the response from the api server as an array. Since we store the state as an object rather than
        // an array, we use the loadash function mapyKeys which takes the 'id' property from each array element and 
        // uses it as a key to create key:value pairs mapping the 'id' key to the array element as value
        // Response = [[id:12, title:"my stream", description:"My description"],[id:3, title:"xyz", description:"abc"]]
        // state = {{12: [id:12, title:"my stream", description:"My description"]},{3: [id:3, title:"xyz", description:"abc"]}}
        
        return { ...state, ..._.mapKeys(action.payload, 'id') };
      case DELETE_STREAM:
      // the payload we get in case of this action from the action creator is just the id
      // the lodash library takes care of creating a new state object and deleting the record with id "id"  
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };