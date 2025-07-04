import React from 'react'
import './todo.css'

const Todo = () => {
  return (
    <div className='todo-app-container'>
      <input 
      className='new-task-input' 
      type="text" 
      placeholder='Please enter New Task Here...' />

      <button className='add-new-task-button'>+Add</button>
    </div>
  )
}

export default Todo
