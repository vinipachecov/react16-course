import React from 'react'
import authContext from '../auth-context';


const Header = (props) => {
  const auth = React.useContext(authContext);
  return (
    <header>
      {
        auth.status ?
        <button
          onClick={props.onLoadTodos}
        >
          Todo List
        </button>
        :
        null
      }

      <button 
        onClick={props.onLoadAuth}
      >
        Auth        
      </button>
    </header>
  )
}

export default Header
