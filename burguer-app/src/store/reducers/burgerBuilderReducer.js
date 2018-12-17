import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.5
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

const addIgrendient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients:  updatedIngredients    ,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true  
  }
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const updatedIngr = { [action.ingredientName]: state.ingredients[action.ingredientName] -  1 };
  const updatedIngs = updateObject(state.ingredients, updatedIngr );
  const updatedSt = {
    [action.ingredientName]:  updatedIngs    ,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]  ,
    building: false
  }
  return updateObject(state, updatedSt);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,        
    },
    error: false,
    totalPrice: 4,
    building: false
  });         
}

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
}

export default (state = initialState, action) => {
  switch (action.type) {

  case ADD_INGREDIENT:
    return addIgrendient(state, action);        
  case REMOVE_INGREDIENT:
    return removeIngredient(state,action);    
  case SET_INGREDIENTS:
   return setIngredients(state,action);
  case FETCH_INGREDIENTS_FAILED:
    return fetchIngredientsFailed(state, action);  
  default:
    return state
  }
}
