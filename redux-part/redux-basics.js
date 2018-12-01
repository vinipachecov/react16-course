const redux = require('redux');
const createStore = redux.createStore;


const inititalState = {
  counter: 0
}

//reducer
const rootReducer = (state = inititalState, action) => {
  switch(action.type) {
    case 'ADD_TO_COUNTER':
      return { ...state, counter: action.payload }
    default: 
    return { ...state };
  }
};


//store
const store = createStore(rootReducer);
console.log(store.getState());

//subscription
store.subscribe(() => {
  console.log('[Subscription]', store.getState());
})

//dispatching action
store.dispatch({ type: 'ADD_TO_COUNTER', payload: 15 });

console.log(store.getState());
