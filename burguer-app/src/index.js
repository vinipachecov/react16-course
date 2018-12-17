import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './store/reducers';
import thunk from 'redux-thunk';


// very usefull middleware
const logger = store => {
  return next => {
    return action => {
      // console.log('[Middleware] dispatching', action);
      const result = next(action);
      // console.log('[Middleware] next state', store.getState());
      return result;
    }
  }
}

// allow dev tools only in development
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
