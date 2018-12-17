import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurguerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({
  adapter: new Adapter()
});

// Example of testing containers -- detach from redux to make user to test only
// the container

describe(' <BurgerBuilder />', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(<BurguerBuilder onInitIngredients={() => {}}/>);                
  })

  it('should render <BuildControls when receiving ingredients' , () => {        
    wrapper.setProps({ ings: { salad: 0 }});        
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })
  
})
