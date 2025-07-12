import { useState } from 'react'//these are hooks
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //syntax for hook:
  //hook gives array in output in 0 pos there is a variable and in 1st pos there is a function which is responsible to change the value of variable
  let [counter,setCounter]=useState(10)
  let [message,setmessage]=useState('')
  // let counter=15
  const addValue=()=>{
    // console.log('value added',Math.random());
    // counter++//this is not happening directly on the ui updation
    counter++
    if(counter>20){
      setmessage('cant add futhur')
      
    }
    else{
    setCounter(counter)
    console.log(counter);
    setmessage('')
    }
    
  }
  const removeValue=()=>{
    counter--
    if(counter<0){
      setmessage('cannot decrease furthur')
      
    }
    else{
    setCounter(counter)
    console.log(counter);
    setmessage('')
    }
  }

  return (
    <>
    <h1>learning hooks</h1>
    <h2>couter value:{counter}</h2>
    <button onClick={addValue}>add value</button>
    <br />
    <button onClick={removeValue}>remove value</button>
    <p>{message}</p>
    </>
   
  )
}

export default App
