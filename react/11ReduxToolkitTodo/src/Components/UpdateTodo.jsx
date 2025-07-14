import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { UpdateTodo } from '../Features/todo/todoSlice'
function UpdateTodo({todo}) {
    const [newText,setNewText]=useState(todo.text)
    const dispatch=useDispatch()
    const updateTodoHandler=(e)=>{
        e.preventDefault()
        dispatch(UpdateTodo({id:todo.id,newText}))
        setNewText('')
    }
  return (
    <form onSubmit={updateTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Update Todo
      </button>
    </form>
  )
}

export default UpdateTodo