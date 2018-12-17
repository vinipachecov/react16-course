import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL, FETCH_ORDERS_START } from "../actions/actionTypes";
import axios from '../../axios-orders';

export const purchaseBurgerPurchase = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  }
}

export const purchaseBurgerFail = (error) => ({
  type: PURCHASE_BURGER_FAIL,
  error
});

export const purchaseBurger = ( orderData, token ) => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const response = await axios.post('/orders.json?auth=' + token, orderData);                  
      dispatch(purchaseBurgerPurchase(response.data.name, orderData))
    } catch (error) {
      console.log(error);
      dispatch(purchaseBurgerFail(error));
    }     
  }
}

export const purchaseBurgerStart = () => ({
  type: PURCHASE_BURGER_START,  
})


export const purchaseInit = (payload) => ({
  type: PURCHASE_INIT,
  payload
})


export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = (error) => ({
  type: FETCH_ORDERS_FAIL,
  error
});

export const fetchOrdersStart = () => ({
  type: FETCH_ORDERS_START,
})

export const fetchOrders = (token, userId) => {
  return async (dispatch) => {
    try {      
      dispatch(fetchOrdersStart())
      const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
      const res = await axios.get('/orders.json' + queryParams);      
      const fetchOrders = [];
      for (const key in res.data) {
        fetchOrders.push({ ...res.data[key], id:key });
      }            
      dispatch(fetchOrdersSuccess(fetchOrders))      
    } catch (error) {
      console.log(error);
      dispatch(fetchOrdersFail(error));
    }    
  }
}



