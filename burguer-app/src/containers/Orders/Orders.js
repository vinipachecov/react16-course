import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders: [],
    loading: true
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/orders.json');
      console.log(res.data);
      const fetchOrders = [];
      for (const key in res.data) {
        fetchOrders.push({ ...res.data[key], id:key });
      }      
      console.log('ordesr = ', fetchOrders);
      this.setState({ loading: false, orders: fetchOrders });      
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });            
    }    
  }

  render() {    
    return (
      <div>
        {
          this.state.orders.map(order => 
            (<Order key={order.id}
              ingredients={order.ingredients}
              price={order.price}
             />)
          )
        }
        {/* <Order/>
        <Order/> */}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios);