import { INCREMENT, DECREMENT, ADD, SUBTRACT } from "./actionsTypes";

export const increment = (param) => {
  return {  
  type: INCREMENT,  
  }
}

export const decrement = (param) => {
  return {  
  type: DECREMENT,  
  }
}

export const add = (value) => {
  return {  
  type: ADD,
  value  
  }
}

export const subtract = (param) => {
  return {  
  type: SUBTRACT,  
  }
}