import {createSlice,nanoid} from '@reduxjs/toolkit'

const initialState={
    todos:[{id:1,text:'hello world'}]
}
export const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload
            }
            state.todos.push(todo)
        },
        removeTodo:(state,action)=>{
            state.todos=state.todos.filter((todo)=>{ return todo.id!==action.payload})
        },
        UpdateTodo:(state,action)=>{
            const {
                id,
                newText}=action.payload
            
            const todoUpdate=state.todos.find((e)=>e.id===id)
            if(todoUpdate){
                todoUpdate.text=newText
            }
        }
    }
})
export const {addTodo,removeTodo,UpdateTodo}=todoSlice.actions
export default todoSlice.reducer