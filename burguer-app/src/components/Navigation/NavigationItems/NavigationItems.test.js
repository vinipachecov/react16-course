import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
  adapter: new Adapter()
});

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  }) 


  it('Should render two <NavigationItem /> elements if not authenticated', () => {
    // ** IMPORTANT
    // We're using shallow because we don't need the full subtrees to be rendered
    // but just enough to test NavigationItems isolated

    // By not sending any auth it is automatically false so only 2 Navigation items should render
    
    expect(wrapper.find(NavigationItem)).toHaveLength(2);            
  })

  it('Should render three <NavigationItem /> elements if authenticated', () => {
    // ** IMPORTANT
    // We're using shallow because we don't need the full subtrees to be rendered
    // but just enough to test NavigationItems isolated

    // By  sending  auth it is automatically true so only 2 Navigation items should render            
    wrapper.setProps({ isAuthenticated: true })
    expect(wrapper.find(NavigationItem)).toHaveLength(3);                
  })
    

  it('Should render <NavigationItem /> element with logout Route if authenticated', () => {            
    wrapper.setProps({ isAuthenticated: true })
    expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
  })
    
})
