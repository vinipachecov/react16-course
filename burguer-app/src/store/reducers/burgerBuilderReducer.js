import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, FETCH_INGREDIENTS_FAILED } from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.5
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
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
  case SET_INGREDIENTS:
    return {
      ...state,
      ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat,        
      },
      error: false,
      totalPrice: 4
    };
  case FETCH_INGREDIENTS_FAILED:
    return {
      ...state,
      error: true
    }
  default:
    return state
  }
}
