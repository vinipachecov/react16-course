import React from 'react'

import User from '../../components/User/User'

class index extends React.Component {

  static async getInitialProps(context) {
    console.log(context);    
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ appName: 'app name var'})        
      }, 1000);
    });
    return promise;    
  }

  render() {
    return (
      <div>
          <h1>The Auth page - {this.props.appName}</h1>        
          <User name={'Yuri'} age={25} />
          <style jsx>{`
            div {
              border: 1px solid #FF0000;
              box-shadow: 0 2p 3px #FF0000;
              padding: 20px;
            }
          `}</style>
      </div>
    )
  }
} 

export default index
