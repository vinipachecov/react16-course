import { delay } from 'redux-saga';
import axios from 'axios';
import configs from '../../configs';
import { put, call } from 'redux-saga/effects';
import { authActions  } from '../actions';


export function* logoutSaga(action) {
  /**Here the use of call helps us 
   * when we decide to test this saga by being
   * easier to mock.
   */
  yield call([localStorage, 'removeItem'], "token");  
  yield call([localStorage, 'removeItem'], "expirationDate");  
  yield call([localStorage, 'removeItem'], "userId");      
  yield put(authActions.logoutSucceed());
}
export function* checkAuthTimeoutSaga(action)  {
  yield delay(action.expirationTime * 1000);
  yield put(authActions.logout());  
}

export function* authUserSaga(action) {
  yield put(authActions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${configs.apiKey}`;
  if (!action.isSignup) {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${configs.apiKey}`;
  }
  try {
    const res = yield axios.post(url, authData);   
    const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000)
    yield localStorage.setItem('token', res.data.idToken);        
    yield localStorage.setItem('expirationDate', expirationDate);  
    yield localStorage.setItem('userId', res.data.localId);
    yield put(authActions.authSuccess(res.data.idToken, expirationDate))
    yield put(authActions.checkAuthTimeout(res.data.expiresIn));
  } catch (error) {
    console.log(error)      
    yield put(authActions.authFail(error.response.data.error))
  } 
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(authActions.logout());      
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date() ) {
      yield put(authActions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(authActions.authSuccess(token, userId));
      yield put(authActions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000 ) );
    }      
  }
}
