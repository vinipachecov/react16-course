import axios from 'axios';
import configs from '../../configs';
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from "./actionTypes";


export const authStart = (payload) => ({
  type: AUTH_START,  
});

export const authSuccess = (idToken, userId) => ({
  type: AUTH_SUCCESS,
  idToken, 
  userId
})

export const authFail = (error) => ({
  type: AUTH_FAIL,
  error
})

export const logout = (param) => ({
  type: AUTH_LOGOUT,  
})


export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());            
    }, expirationTime * 1000);
  }
}


export const auth = (email, password, isSignup) => {
  return async dispatch => {
    console.log(email, password);
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${configs.apiKey}`;
    if (!isSignup) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${configs.apiKey}`;
    }
    try {
      const res = await axios.post(url, authData);      
      dispatch(authSuccess(res.data.idToken, res.data.localId))
      dispatch(checkAuthTimeout(res.data.expiresIn));
    } catch (error) {
      console.log(error)      
      dispatch(authFail(error.response.data.error))
    }    
    
  }
}


export const setAuthRedirectPath = (path) => ({
  type: SET_AUTH_REDIRECT_PATH,
  path
})
