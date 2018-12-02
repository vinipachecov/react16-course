import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { increment, decrement, subtract, storeResult, deleteResult, add } from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {        
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(5)}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(storedResult => {
                        return (
                        <li 
                        onClick={() => this.props.onDeleteResult(storedResult.id)}
                        key={storedResult.id}
                        >                                                
                            {storedResult.value}
                        </li>
                        )
                    })}                    
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ctr: state.ctr.counter,
    storedResults: state.res.results
})

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => dispatch(increment()),
        onDecrementCounter: () => dispatch(decrement()),
        onAddCounter: (value) => dispatch(add(value)),
        onSubtractCounter: (value) => dispatch(subtract(value)),
        onStoreResult: (result) => dispatch(storeResult(result)),
        onDeleteResult: (id) => dispatch(deleteResult(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);