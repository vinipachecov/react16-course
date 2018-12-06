 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';


import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, addIgredient, removeIgredient, initIgredients } from '../../store/actions/burgerBuilderAction';
import { purchaseInit } from '../../store/actions/orderActions';


class BurguerBuilder extends Component {
  
  state = {            
    purchasing: false,    
  }

  async componentDidMount() {
    this.props.onInitIngredients();
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
      return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.ings[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIgredients = {
  //     ...this.props.ings
  //   };
  //   updatedIgredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;    
  //   this.setState({totalPrice: newPrice, ingredients: updatedIgredients });
  //   this.updatePurchaseState(updatedIgredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if ( oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIgredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIgredients[type] = updatedCount;
  //   const priceReduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceReduction;    
  //   this.setState({totalPrice: newPrice, ingredients: updatedIgredients });
  //   this.updatePurchaseState(updatedIgredients);
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true});
  }

  // Related also to the backdrop so it cancel the current purchase 
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false});
  }
  
  //
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();    
    this.props.history.push('/checkout');
  }

  render() {
    // check if a button should be disabled
    const disabledInfo = {
      ...this.props.ings      
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;       
    
    let burguer = this.props.error ? 
    <p>Ingredient's could not be loadded!</p>
    :
     <Spinner />;
    if (this.props.ings) {
      burguer =  (
        <Aux>
        <Burger ingredients={this.props.ings}/>
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
        />
        </Aux>
      );
      orderSummary =   <OrderSummary 
      ingredients={this.props.ings}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      price={this.props.price} />;
    }    

    // if (this.state.loading) {
    //   orderSummary = <Spinner />
    // }

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

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  error: state.burgerBuilder.error,
  price: state.burgerBuilder.totalPrice
})

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(addIgredient(ingredientName)),
    onIngredientRemove: (ingredientName) => dispatch(removeIgredient(ingredientName)),
    onInitIngredients: () => dispatch(initIgredients()),
    onInitPurchase: () => dispatch(purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));