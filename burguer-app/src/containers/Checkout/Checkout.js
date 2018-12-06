import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import { purchaseInit } from '../../store/actions/orderActions';
// What the user is about to buy
class Checkout extends Component {  
 

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {    
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    const { ings, purchased } = this.props;
    let summary = <Redirect to="/"/>;
    if (this.props.ings) {
      const purchasedRedirect = purchased ? <Redirect to="/"/> : null;
      summary =(
        <div>
          {purchasedRedirect}
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
      );
    }

    return (      
        summary
   );
  }
}

const mapStateToProps = state => {
  return { 
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);