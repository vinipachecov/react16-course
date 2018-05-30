import React, { Component } from 'react';

import classes from './Person.css';

class Person extends Component {    
  constructor(props) {
    super(props);
    console.log('[Person.js] inside the constructor')       
  }

  componentWillMount() {
    console.log('[Person.js] inside component will mount');
  }

  componentDidMount() {
    console.log('[Person.js] inside component did mount');    
  }
  

  render () {
    console.log('[Person.js] inside render');    
    return (    
      <div className={classes.Person}>
          <p onClick={this.props.click}>I'm a person and I am {this.props.name} and I am {this.props.age} years old </p>
          <p>{this.props.children}</p>
          <input type='text' onChange={this.props.changed} value={this.props.name}/>
      </div>  
    );
  }  
};

export default Person;