import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import { burgerBuilderActions } from '../actions';

export function* initIngredientsSaga(action) {
  try {      
    const response = yield axios
      .get('/Ingredients.json?auth =');
      yield put(burgerBuilderActions.setIngredients(response.data));      
  } catch (error) {            
    yield put(burgerBuilderActions.fetchIngredientsFailed())
  }        
}