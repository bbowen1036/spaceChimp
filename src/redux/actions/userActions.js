import axios from 'axios';
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from '../types';

// Login
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/login', userData)
  .then(res => {
    setAuthorizationHeader(res.data.token)
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');     // redirect to home page
  }) 
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  });  
};

// Signup
export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios.post('/signup', newUserData)
  .then(res => {
    setAuthorizationHeader(res.data.token)
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push('/');     // redirect to home page
  }) 
  .catch(err => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  });  
};

// Logout
export const logoutUser = () => dispatch => {
  localStorage.removeItem('FBIdToken');   // remove token from local storage
  delete axios.defaults.headers.common['Authorization'];  // delete authorization header from axios
  dispatch({ type: SET_UNAUTHENTICATED });   // dispatch unauthenticated to store
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

// Upload profile image 
export const uploadImage = (formData) => dispatch => {
  dispatch({ type: LOADING_USER });
  axios.post('/user/image', formData)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch(err => {
      console.log(err)
    })
};

export const editUserDetails = (userDetails) => dispatch => {
  dispatch({ type: LOADING_USER });
 
  axios.post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err))
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken)   // Set token to Local Storage
  axios.defaults.headers.common['Authorization'] = FBIdToken;       // Adding token to axios header
};