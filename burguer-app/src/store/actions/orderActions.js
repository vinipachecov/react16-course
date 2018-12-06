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

export const purchaseBurger = ( orderData ) => {
  return async dispatch => {
    try {
      dispatch(purchaseBurgerStart());
      const response = await axios.post('/orders.json', orderData);                  
      dispatch(purchaseBurgerPurchase(response.data.name, orderData))
    } catch (error) {
      console.log('deu erro ', error);
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

export const fetchOrders = (payload) => {
  return async dispatch => {
    try {      
      dispatch(fetchOrdersStart())
      const res = await axios.get('/orders.json');
      console.log(res.data);
      const fetchOrders = [];
      for (const key in res.data) {
        fetchOrders.push({ ...res.data[key], id:key });
      }      
      console.log('orders = ', fetchOrders);
      dispatch(fetchOrdersSuccess(fetchOrders))      
    } catch (error) {
      console.log(error);
      dispatch(fetchOrdersFail(error));
    }    
  }
}



