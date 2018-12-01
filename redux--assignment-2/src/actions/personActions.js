import { ADD_PERSON, DELETE_PERSON } from "./actionsType";

export const addPerson = (payload) => ({
  type: ADD_PERSON,
  payload
})

export const deletePerson = (payload) => ({
  type: DELETE_PERSON,
  payload: payload
})
