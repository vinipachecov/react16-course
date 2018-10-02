 
import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.5
};

export default class BurguerBuilder extends Component {
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 2,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState (ingredients) {  
 
    //go through the ingredients 
    const sum = Object.keys(ingredients)
      .map(igKey => {
        //return the ammount of an ingredient
        return ingredients[igKey];
      })
      // get the total ammount of ingredients
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIgredients = {
      ...this.state.ingredients
    };
    updatedIgredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;    
    this.setState({totalPrice: newPrice, ingredients: updatedIgredients });
    this.updatePurchaseState(updatedIgredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if ( oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIgredients = {
      ...this.state.ingredients
    };
    updatedIgredients[type] = updatedCount;
    const priceReduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduction;    
    this.setState({totalPrice: newPrice, ingredients: updatedIgredients });
    this.updatePurchaseState(updatedIgredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true});
  }

  // Related also to the backdrop so it cancel the current purchase 
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false});
  }
  
  //
  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    // check if a button should be disabled
    const disabledInfo = {
      ...this.state.ingredients      
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        /> 
      </Aux>
    )
  }
};
