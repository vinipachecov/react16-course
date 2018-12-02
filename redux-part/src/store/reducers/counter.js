import { INCREMENT, ADD, SUBTRACT, DECREMENT } from "../actions/actionsTypes";
import { updatedObject } from "../utility";

const initialState = {
  counter: 0,  
}

const reducer = (state = initialState, action) => {
  console.log(state,action);  
  switch (action.type) {
    case INCREMENT:
      return updatedObject(state, {counter: state.counter + 1});                  
    case DECREMENT:
      return updatedObject(state, {counter: state.counter - 1});                  
    case ADD:
    return updatedObject(state, {counter: state.counter + action.value});            
    case SUBTRACT:
      return updatedObject(state, {counter: state.counter - action.value});      
    default:
    return state;
  }  
}

export default reducer;  