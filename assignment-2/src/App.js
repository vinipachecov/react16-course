import React, { Component } from 'react';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    text: 'teste'
  };


  onTextChangeHandler = (text) => {    
    this.setState({text});
  };

  getLengthOfText = (text) => {
    return text.length;
  }

  renderListOfChar = (text) => {
    const list = text.split('');    
    return list.map(char => {
      console.log(char);
      return <Char           
      letter={char}/>
    });    
  }

  render() {
    const {text} = this.state;
    return (
      <div className="App">
      <input onChange={(event) => this.onTextChangeHandler(event.target.value)}  value={text}/>
      <p>{this.getLengthOfText(text)}</p>
       <Validation input={text.length} /> 
        {this.renderListOfChar(text)}
      </div>
    );
  }
}

export default App;
