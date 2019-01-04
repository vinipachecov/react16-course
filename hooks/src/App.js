import React, { Component, useState } from 'react';
import Todo from './components/Todo';
import Header from './components/Header'
import Auth from './components/Auth';
import AuthContext from './auth-context';



const App = () => {
  const [ page, setPage] = useState('auth');
  const [authState, setAuthState] = useState(false)
  const switchPage = (pageName) => {
    setPage(pageName);
  }

  const login = () => {
    setAuthState(true)
  }

  return (
    <div className="App">
    <AuthContext.Provider value={{ status: authState, login }}>
      <Header 
        onLoadTodos={switchPage.bind(this, 'todos')} 
        onLoadAuth={switchPage.bind(this, 'auth')} 
      />
      <hr/>
      {page === 'auth' ? <Auth /> : <Todo/>}     
    </AuthContext.Provider>
  </div>
  )
}

export default App
