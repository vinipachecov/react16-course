import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';


import Users from './containers/Users'
import asyncComponent from './hoc/asyncComponent';

const asyncPizza = asyncComponent(() =>{
  return import('./containers/Pizza');
})

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Users</Link> |
          <Link to="/pizza">Pizza</Link>
        </div>      
        <Route path='/' exact componet={Users}/>  
        <Route path='/pizza' exact componet={asyncPizza}/>  
      </div>
    )
  }
}
