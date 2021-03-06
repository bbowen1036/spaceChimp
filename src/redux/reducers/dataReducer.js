import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUMBIT_COMMENT,
} from '../types';

const initialState = {
  screams: [],              // Array that holds all screams
  scream: {},               // details of 1 scream
  loading: false,           // default loading false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_SCREAM: 
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state
      };
    case DELETE_SCREAM:  // post was deleted from server so now we will only delete locally rather than making another call to DB and returning updated posts 
      let deleteIndex = state.screams.findIndex(scream => scream.screamId === action.payload);
      state.screams.splice(deleteIndex, 1); // splice : target that index and remove ONLY that index
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [
          action.payload,          // new post will go in the front of the array
          ...state.screams 
        ]
      };
    case SUMBIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,       // the other stuff inside the scream object
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default: 
      return state;
  }
}