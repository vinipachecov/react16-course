import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
// What the user is about to buy
class Checkout extends Component {  

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {    
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    const { ings } = this.props;
    return (
      <div>
        <CheckoutSummary
          ingredients={ings}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        />
        <Route 
          path={this.props.match.url + '/contact-data'} 
          component={ContactData}                  
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout);