import React, { Component } from 'react'
import {   
  Switch, 
  Route,
  Link,
  Redirect
} from 'react-router-dom';


import Courses from '../Courses/Courses';
import Users from '../Users/Users';

export default class Main extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul style={{ listStyleType: 'none'}}>
            <li style={{ display: 'inline-block', margin: '20px'}}>
            <Link to='/users'>
                Users
            </Link>
            </li>
            <li style={{ display: 'inline-block', margin: '20px'} }>
            <Link to='/courses'>
            Courses
            </Link>
            </li>
          </ul>
      </nav>  
      <Switch>
          <Route exact path='/users/' component={Users} />                  
          <Route path='/courses/' component={Courses} />            
          <Redirect from='/all-courses' to='/courses/'/>
          <Route render={() => <h1> 404: Page not Found, expert chiuauas working on it.</h1>}/>
          
        </Switch>
    </div>
    )
  }
}
