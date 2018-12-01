 
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
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../store/actions';


class BurguerBuilder extends Component {
  
  state = {            
    purchasing: false,
    loading: false,
    error: false
  }

  async componentDidMount() {
    try {
      // const response = await axios
      //   .get('/Ingredients.json');
      // this.setState({
      //   ingredients: response.data
      // });      
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
  purchaseContinueHandler = async () => {
    
    // const queryParams = [];
    // for (const ingredient in this.state.ingredients) {      
    //   queryParams.push(
    //     encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient])
    //   )
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
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
    
    let burguer = this.state.error ? 
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

const mapStateToProps = (state) => ({
  ings: state.ingredients,
  price: state.totalPrice
})

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type: ADD_INGREDIENT, ingredientName }),
    onIngredientRemove: (ingredientName) => dispatch({type: REMOVE_INGREDIENT, ingredientName }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));