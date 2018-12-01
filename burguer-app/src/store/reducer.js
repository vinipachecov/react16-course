import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "./actions";

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.5
};

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  },
  totalPrice: 4
}

export default (state = initialState, action) => {
  switch (action.type) {

  case ADD_INGREDIENT:
    return { ...state, ingredients:{
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1      
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]  
  };
  case REMOVE_INGREDIENT:
  return { ...state, ingredients:{
    ...state.ingredients,
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]  
  };
  default:
    return state
  }
}
