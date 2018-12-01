import { RECEIVE_PERSON_LIST, ADD_PERSON, DELETE_PERSON } from "../actions/actionsType";

const initialState = {
  persons: []
}

export default (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_PERSON_LIST:
    return { ...state };
  case ADD_PERSON:
    return { ...state, persons: [...state.persons].concat(action.payload)}
  case DELETE_PERSON:
    return { ...state, persons: state.persons.filter(person => person.id !== action.payload)}
  default:
    return state
  }
};
