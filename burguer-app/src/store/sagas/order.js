import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';


/**
 * Send request to firebase to create a new order
 * @param {*} action 
 */
export function* purchaseBurgerSaga(action) {
  try {
    yield put(actions.orderActions.purchaseBurgerStart());
    const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);                  
    yield put(actions.purchaseBurgerPurchase(response.data.name, actions.orderData))
  } catch (error) {
    console.log(error);
    yield put(actions.orderActions.purchaseBurgerFail(error));
  }    
}

/**
 * Get users orders from firebase
 * @param {*} action 
 */
export function* fetchOrdersSaga(action) {
  try {      
    yield put(actions.orderActions.fetchOrdersStart())
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId +'"';
    const res = yield axios.get('/orders.json' + queryParams);      
    const fetchOrders = [];
    for (const key in res.data) {
      yield fetchOrders.push({ ...res.data[key], id:key });
    }            
    yield put(actions.orderActions.fetchOrdersSuccess(fetchOrders))      
  } catch (error) {
    console.log(error);
    yield put(actions.orderActions.fetchOrdersFail(error));
  }    
}