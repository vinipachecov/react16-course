import { combineReducers } from 'redux';
import orderReducer from './order';
import burgerBuilderReducer from './burgerBuilderReducer';

export default combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer
})