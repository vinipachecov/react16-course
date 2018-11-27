 
import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.5
};

class BurguerBuilder extends Component {
  
  state = {
    ingredients: null,
    totalPrice: 2,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  async componentDidMount() {
    try {
      const response = await axios
        .get('/Ingredients.json');
      this.setState({
        ingredients: response.data
      });      
    } catch (error) {
      this.setState({ error: true });
      console.log(error);      
    }    
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
  purchaseContinueHandler = async () => {
    
    const queryParams = [];
    for (const ingredient in this.state.ingredients) {      
      queryParams.push(
        encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient])
      )
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    })
  }

  render() {
    // check if a button should be disabled
    const disabledInfo = {
      ...this.state.ingredients      
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;       
    
    let burguer = this.state.error ? 
    <p>Ingredient's could not be loadded!</p>
    :
     <Spinner />;
    if (this.state.ingredients) {
      burguer =  (
        <Aux>
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
      );
      orderSummary =   <OrderSummary 
      ingredients={this.state.ingredients}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.state.totalPrice} />;
    }    

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          { orderSummary }
        </Modal>
        {burguer}       
      </Aux>
    )
  }
};

export default withErrorHandler(BurguerBuilder, axios);