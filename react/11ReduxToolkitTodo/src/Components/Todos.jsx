import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { removeTodo } from '../Features/todo/todoSlice'
function Todos() {
    const data=useSelector((state)=>state.todos)//holds array
    const dispatch=useDispatch()
  return (
    <div>Todos</div>
    {data.map((todo)=>(
        <li key={todo.id}>{todo.text}</li>
        <button onClick={()}></button>
    ))}
  )
}

export default Todos