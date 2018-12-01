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
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }, 
      deliveryMode: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest'},
            { value: 'cheapest', displayValue: 'Cheapest'}
        ]
        },       
        validation: {},
        valid: true,
        value: '',               
      },                     
    },
    formIsValid: false,
    loading: false,    
  }  

  orderHandler = async (event) => {
    event.preventDefault();    
    this.setState({ loading: true });
    const formData = {

    }
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;                  
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData      
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

  checkValidity = (value, rules ) => {

    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }


    return isValid

  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement =  { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value, updatedFormElement.validation
      );
    updatedFormElement.touched = true;
      console.log(updatedFormElement);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;      
    }
    console.log('is valid = ', formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid });

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
    let form = ( <form onSubmit={this.orderHandler}>      
      { formElementsArray.map(formElement => (
        <Input           
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
          touched={formElement.config.touched}
        />
      ))}      
      <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
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
