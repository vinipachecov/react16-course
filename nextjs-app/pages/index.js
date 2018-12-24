import React from 'react'
import Link from 'next/link'
import Router from 'next/router';

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
          <h1>The main page</h1>
          <p>Go to <Link href="/auth"><a>Auth</a></Link></p>
          <button onClick={() => Router.push('/auth')}>Go to Auth</button>
      </div>
    )
  }
} 

export default index
