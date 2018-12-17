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

export const logout = (param) => 
{
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return ({
    type: AUTH_LOGOUT,  
  })
}



export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());            
    }, expirationTime * 1000);
  }
}


export const auth = (email, password, isSignup) => {
  return async dispatch => {    
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
      const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
      localStorage.setItem('token', res.data.idToken);        
      localStorage.setItem('expirationDate', expirationDate);  
      localStorage.setItem('userId', res.data.localId);
      dispatch(authSuccess(res.data.idToken, expirationDate))
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

export const authCheckState = (payload) => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());      
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date() ) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000 ) );
      }      
    }
  }
}

