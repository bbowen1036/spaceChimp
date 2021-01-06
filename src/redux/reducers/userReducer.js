import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SCREAM,
  UNLIKE_SCREAM
} from '../types';

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notification: [],
  loading: false         //to handle user profile loading
};

export default function(state = initialState, action) {
  switch(action.type){
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER: 
      return {
        ...state,
        loading: true
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      }
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(                              // should remove the POST that was liked and LEAVE the other ones
          (like) => like.screamId !== action.payload.screamId                          
          // (like) => like.screamId === action.payload.screamId
        )
      }
    default:
      return state;
  }
};


