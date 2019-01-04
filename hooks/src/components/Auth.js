import React from 'react'
import authContext from '../auth-context';



const Auth = (props) => {
  // use the context!
  const auth = React.useContext(authContext);
 
  return (
    <button 
      onClick={auth.login}
    >
      Log in!
    </button>
  )
}

export default Auth
