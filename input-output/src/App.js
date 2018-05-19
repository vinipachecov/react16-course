import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';


class App extends Component {
  
  state = {
    name: 'John'
  };

  onSwitchNameHandler = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
      <UserInput change={this.onSwitchNameHandler}/>
      <UserOutput name={this.state.name}/>      
      </div>
    );
  }
}

export default App;
