import React from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class orderSummary extends React.Component {
  componentWillUpdate() {
    console.log("['ordersummary'] will update")
  }
  render() {
      const ingredientSUmmary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize'}}>
              {igKey}
            </span>
            : {this.props.ingredients[igKey]}
          </li>)
      })
    
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burguer with the following ingredients:</p>
        <ul>
          {ingredientSUmmary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType={'Danger'} clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button btnType={'Success'} clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );

  }
}


export default orderSummary;