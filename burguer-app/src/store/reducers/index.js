import { combineReducers } from 'redux';
import orderReducer from './order';
import burgerBuilderReducer from './burgerBuilderReducer';
import authReducer from './auth';

export default combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});