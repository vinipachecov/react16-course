import { INCREMENT, ADD, SUBTRACT, STORE_RESULT, DELETE_RESULT, DECREMENT } from "../actions";

const initialState = {  
  results: []
}

const reducer = (state = initialState, action) => {
  console.log(state,action);  
  switch (action.type) {    
    case STORE_RESULT:
      return { ...state, results: state.results.concat({id: new Date(), value: action.value})};
    case DELETE_RESULT:    
      const updatedArray = state.results.filter((result) => result.id !== action.resultElId )
      return { ...state, results: updatedArray }
    default:
    return state;
  }  
}

export default reducer;  