import { REMOVE_INGREDIENT, ADD_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED, INIT_INGREDIENTS } from './actionTypes';
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

export const initIgredients = () => ({
  type: INIT_INGREDIENTS
})