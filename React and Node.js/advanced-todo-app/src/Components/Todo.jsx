import React from 'react'
import './todo.css'

const Todo = () => {
  return (
    <div className='task-container'>
      <div className='add-new-task'>
        <input 
          className='new-task-input' 
          type="text" 
          placeholder='Please enter New Task Here...' />

        <button className='add-new-task-button'>+Add</button>
      </div>
      <div className='task-info'>
        <p className='count'>All Tasks: {21}</p>
        <p className='count'>Completed Tasks: {10}</p>
        <p className='count'>Pending Tasks: {11}</p>
        <button className='Tsk-chn-btn'>{'<'}</button>
        <p className='count'>{'Home Tasks'}</p>
        <button className='Tsk-chn-btn'>{'>'}</button>
      </div>
      <div className='task-display'>
        <textarea name="Display All Task Here" id=""></textarea>
      </div>
      
      
    </div>

    
  )
}

export default Todo
