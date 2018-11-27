import React, { Component } from 'react'

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'

class ContactData extends Component {
  state = {    
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }  

  orderHandler = async (event) => {
    event.preventDefault();    
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Vinicius Vieira',
        address: {
          street: 'Test street',
          zipCode: '123456',
          country: 'Brazil'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    try {
      await axios.post('/orders.json', order);
      this.setState({ loading: false });
      this.props.history.push('/')
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }        
  }


  render() {
    const { loading } = this.state;
    let form = ( <form>
      <input className={classes.Input} type="text" name="name" placeholder="Your name" />
      <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
      <input className={classes.Input} type="text" name="street" placeholder="Street" />
      <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />          
      <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
    </form> );
    if (loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact Data</h4>        
              {form}
      </div>
    )
  }
}

export default ContactData;
