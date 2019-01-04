import React from 'react'

const List = (props) => {
  console.log('rendering our list')
  return (
    <ul >
    {props.todoList.map((todo )=> {
      return (
       <li 
         key={todo.id}
         onClick={() => props.todoRemoveHandler(todo.id)}
       >
         {todo.name}            
       </li>
      )
    })}
  </ul>
  )
}

export default List
