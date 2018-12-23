import React, { Component } from 'react';

/**
 * This component helps to lazy load components
 * and not load all components at once making our
 * first load heavy in bigger applications
 * @param {*} importComponent 
 */
const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }

    componentDidMount() {
      importComponent()
      .then(cmp => {
        this.setState({ component: cmp.default });
      })
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props}/> : null
    }
  }
}

export default asyncComponent;