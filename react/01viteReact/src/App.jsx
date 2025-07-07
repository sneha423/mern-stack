import { useState } from 'react';
import Basic from './basics';
function App() {
  const [count, setCount] = useState(0)
  const username='sneha gupta'
  return (
    <>
    <Basic/>
    <h1>hey!! {username}</h1>
    {/* the thing in curly braces is evaluated expression */}
    </>
    
   
  )
}

export default App
