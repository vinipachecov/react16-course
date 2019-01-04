import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import './index.css';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './store/reducers';
import thunk from 'redux-thunk';
import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas';

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

const sagaMiddleware = createSagaMiddleware();


// allow dev tools only in development
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));


sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
