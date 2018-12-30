import { 
  PURCHASE_BURGER_SUCCESS, 
  PURCHASE_BURGER_FAIL, 
  PURCHASE_BURGER_START, 
  PURCHASE_INIT, 
  FETCH_ORDERS_SUCCESS, 
  FETCH_ORDERS_FAIL, 
  FETCH_ORDERS_START, 
  PURCHASE_BURGER, 
  FETCH_ORDERS 
} from "../actions/actionTypes";

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

export const purchaseBurger = ( orderData, token ) => ({
  type: PURCHASE_BURGER,
  orderData,
  token
})

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

export const fetchOrders = (token, userId) => ({  
  type: FETCH_ORDERS,
  token,
  userId
})  



