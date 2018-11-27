import React, { Component } from 'react'

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css'

class ContactData extends Component {
  state = {    
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zipcode'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: ''
      }, 
      email: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest'},
            { value: 'cheapest', displayValue: 'Cheapest'}
        ]
        },
        value: ''
      },                     
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
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })           
    }
    const { loading } = this.state;
    let form = ( <form>      
      { formElementsArray.map(formElement => (
        <Input           
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
        />
      ))}      
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
