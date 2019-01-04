 import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react'
 import axios from '../axios-config';
import List from './List';
import { useFormInput } from '../hooks/forms';

 /**
  * To use it create a firebase app 
  * export a new axios instance with
  * the baseURL been the firebase-RTDB 
  * url.
  */
 

 const Todo = props => {
   // useState return an array******
   const [inputIsValid, setInputIsValid] = useState(false);
  //  const [todoName, setTodoName] = useState('');
  //  const [todoList, setTodoList] = useState([]);
  //  const [submittedTodo, setSubmittedTodo] = useState(null)
  // const [todoState, setTodoState] = useState({
  //   userInput: '',
  //   todoList: []
  // })

  
  // const todoInputRef = useRef();  
  const todoInput = useFormInput();

  const todoListReducer = (state, action) => {
    switch(action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter((todo) => todo.id !== action.payload );
      default: 
        return state;
    }
  }

  const [todoList, dispatch] = useReducer(todoListReducer, []);
  // Runs when the component runs for the first time 
  // *** RUNS ON EVERY RENDER CICLE
 

  const mouseMoveHandler = (event) => {
    console.log(event.clientX, event.clientY);
  }



  

  // useEffect(() => {
  //   document.addEventListener('mousemove', mouseMoveHandler)
  //   return () => {
  //     document.removeEventListener('mousemove', mouseMoveHandler)
  //   }
  // }, [])
/**
 * Use Effect:
 * To run only when mounting, the second param need to be = []
 * To run like ComponentDidMount plus ComponentDidUpdate with an if
 * use the second parameter = ['watchThis']
 */

// update our todoList
  // useEffect(() => {
  //   if (submittedTodo) {
  //     dispatch({ type: 'ADD', payload: submittedTodo})
  //     // setTodoList(todoList.concat(submittedTodo));
  //   }    
  // }, [submittedTodo]);

  //  const inputChangeHandler = (event) => {
  //   // setTodoState({ userInput: event.target.value, todoList: todoState.todoList });
  //   setTodoName(event.target.value);
  //  };

  const inputValidationHandler = (event) => {
    if (event.target.value.trim() === '') {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
    }    
  }

   const todoAddHandler = async () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput),
    // });
    const todoName = todoInput.value;
    try {
      const res = await axios.post('todos.json', { name: todoName });    
      const todoItem = { id: res.data.name, name: todoName  }
      // setTodoList(todoList.concat(todoItem));    
      // setSubmittedTodo(todoItem);
      dispatch({ type: 'ADD', payload: todoItem });
      console.log(res)      
    } catch (error) {
      console.log(error)      
    }    
   }   
   useEffect(() => {    

    axios.get('todos.json')
    .then(res => {
      const todoData = res.data
      console.log('res.data', res.data)
      const todos = [];
      for (const key in todoData) {
        todos.push({id: key, name: todoData[key].name});        
      }
      dispatch({type: 'SET', payload: todos });
      console.log(todos)
      // setTodoList(todos);
    });
    return () => {
      console.log('Cleanup')
    }
  }, [])

   const todoRemoveHandler = async todoId => {
     try {
      axios.delete(`todos/${todoId}.json`)       
      dispatch({ type: 'REMOVE', payload: todoId });
     } catch (error) {
       console.log(error)       
     }     
   }

   return (
     <React.Fragment>
       <input 
        type="text"
        placeholder="Todo"
        onChange={todoInput.onChange}
        value={todoInput.value}
        // ref={todoInputRef}
        // onChange={inputValidationHandler}
        style={{ backgroundColor: todoInput.validity ? 'transparent': 'red' }}
       />
       <button 
          type="button" 
          onClick={todoAddHandler}>
          Add
        </button>
        {
          useMemo(() => <List 
            todoRemoveHandler={todoRemoveHandler}
            todoList={todoList}
          />, [todoList])
          
        }
     
     </React.Fragment>
   )
 };

 export default Todo;