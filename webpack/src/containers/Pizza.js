import React, { Component } from 'react'
import PIzzaImge from '../components/PizzaImage/PizzaImage';
import PizzaImage from '../components/PizzaImage/PizzaImage';

export default class Pizza extends Component {
  render() {
    return (
      <div>
        <h1>Pizza</h1>
        <PizzaImage />        
      </div>
    )
  }
}
