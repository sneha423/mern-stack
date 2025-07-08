import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './card'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Card username='youtube'/>
      <h1 className='bg-green-400 text-black p-5 rounded-xl'>tailwind test</h1>
      <Card username='sneha hello'/>
    </>
  )
}

export default App
