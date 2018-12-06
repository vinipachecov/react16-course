import { REMOVE_INGREDIENT, ADD_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from './actionTypes';
import axios from '../../axios-orders';

export const addIgredient = (ingredientName) => ({
  type: ADD_INGREDIENT,
  ingredientName
})


export const removeIgredient = (ingredientName) => ({
  type: REMOVE_INGREDIENT,
  ingredientName
})

export const setIngredients = (ingredients) => ({
  type: SET_INGREDIENTS,
  ingredients
})

export const fetchIngredientsFailed = () => ({
  type: FETCH_INGREDIENTS_FAILED
})

export const initIgredients = () => {
  return async dispatch => {
    try {      
      const response = await axios
        .get('/Ingredients.json');
        dispatch(setIngredients(response.data));      
    } catch (error) {            
      dispatch(fetchIngredientsFailed())
    }        
  }
}