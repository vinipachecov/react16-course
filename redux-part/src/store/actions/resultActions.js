import { STORE_RESULT, DELETE_RESULT } from "./actionsTypes";

export const saveResult = (result) => {  
  return ({
    type: STORE_RESULT,
      result  
  });  
}
export const storeResult = (result) => {
  return (dispatch, getState) => {
    // console.log('oldState =', getState());
    // const oldCounter = getState().ctr.counter;
    setTimeout(() => {
      // console.log('old counter = ', oldCounter);
      dispatch(saveResult(result));
      // console.log('object');    
    }, 2000);    
  }  
}


export const deleteResult = (resultElId) => {
  return {  
  type: DELETE_RESULT,
  resultElId  
  }
}
