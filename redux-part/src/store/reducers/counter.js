import { INCREMENT, ADD, SUBTRACT, STORE_RESULT, DELETE_RESULT, DECREMENT } from "../actions";

const initialState = {
  counter: 0,  
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
    default:
    return state;
  }  
}

export default reducer;  