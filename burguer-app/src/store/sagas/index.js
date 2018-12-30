import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth'
import * as actionTypes from '../actions/actionTypes';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurger } from './order';
import { fetchOrders } from '../actions/orderActions';

export function* watchAuth() {
  // all* runs multiple synchronous code  
  yield all([
      takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
      takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),  
      takeEvery(actionTypes.AUTH_USER, authUserSaga),
      takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)  
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurger);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrders);
}