import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {

  constructor(props) {
    super(props);
    console.log('[Perons.js] inside the constructor');
    this.lastPersonRef = React.createRef();       
  }

  componentWillMount() {
    console.log('[Persons.js] inside component will mount');
  }

  componentDidMount() {
    console.log('[Persons.js] inside component did mount');  
    this.lastPersonRef.current.focus()  ;
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE Persons.js] inside componentwillReceiveProps', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[UPDATE Persons.js] inside shouldcomponentupdate', nextProps, nextState);
    return nextProps.persons !== this.props.persons;
  }  

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE Persons.js] inside componentwillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE Persons.js] inside componentdidUpdate');
  }
 
  render () {
    console.log('[Persons.js] inside render');    
    return this.props.persons.map((person,index) => {
      return <Person               
        click={() => this.props.clicked(index)}
        name={person.name}
        age={person.age}
        key={person.id}
        ref={this.lastPersonRef}        
        position={index}
        changed={(event) => this.props.changed(event, person.id)}
       />
      });
  }  
}

  export default Persons;
