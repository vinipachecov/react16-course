import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

//default route
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
//seting commomn headers
axios.defaults.headers.common['Authorization']  = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//Axios interceptors are very useful for common headers like authentication 
// as it will modify every request not only in this file but everywhere in the project
axios.interceptors.request.use(request => {
  console.log(request);
  //Edit request config here****
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

//Same thing but for responses.
axios.interceptors.response.use(request => {
  console.log(request);
  //Edit request config here****
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);

})

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
