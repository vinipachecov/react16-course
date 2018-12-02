import { INCREMENT, ADD, SUBTRACT, STORE_RESULT, DELETE_RESULT, DECREMENT } from "./actions/actionsTypes";

const initialState = {
  counter: 0,
  results: []
}

const reducer = (state = initialState, action) => {
  console.log(state,action);  
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1}      
    case DECREMENT:
      return { ...state, counter: state.counter - 1};
    case ADD:
      return { ...state, counter: state.counter + action.value};
    case SUBTRACT:
      return { ...state, counter: state.counter - action.value};
    case STORE_RESULT:
      return { ...state, results: state.results.concat({id: new Date(), value: state.counter})};
    case DELETE_RESULT:    
      const updatedArray = state.results.filter((result, index) => result.id !== action.resultElId )
      return { ...state, results: updatedArray }
    default:
    return state;
  }  
}

export default reducer;  