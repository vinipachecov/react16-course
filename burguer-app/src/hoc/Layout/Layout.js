import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class layout extends Component {
  state = {
    showSideDrawer: false
  }

  // Handler sideDrawer so the backdrop can be managed in a better way
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {      
       return { showSideDrawer: !prevState.showSideDrawer }
      });
  }

  render () {
    return(
        <Aux>
          <Toolbar 
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleHandler}
          />    
          <SideDrawer 
            isAuth={this.props.isAuthenticated}
            closed={this.sideDrawerClosedHandler} 
            open={this.state.showSideDrawer} 
          />
          <main className={classes.Content}>
            {this.props.children}
          </main>
        </Aux>
    );
  }
} 

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null  
});



export default connect(mapStateToProps)(layout);
