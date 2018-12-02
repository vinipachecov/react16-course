import { STORE_RESULT, DELETE_RESULT } from "../actions/actionsTypes";
import { updatedObject } from "../utility";

const initialState = {  
  results: []
}

const deleteResult = (state, action) => {
  const updatedArray = state.results.filter((result) => result.id !== action.resultElId )
  return updatedObject(state, { results: updatedArray});      
}

const reducer = (state = initialState, action) => {
  console.log(state,action);  
  switch (action.type) {    
    case STORE_RESULT:
      return updatedObject(
        state, {results: state.results.concat({id: new Date(), value: action.value}) });          
    case DELETE_RESULT:        
      return deleteResult(state, action);      
    default:
      return state;
  }  
}

export default reducer;  