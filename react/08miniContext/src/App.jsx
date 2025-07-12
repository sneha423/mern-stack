import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import userContextProvider from './Context/UserContextProvider'
function App() {
  

  return (
    <userContextProvider>
      <h1>mini context api project</h1>
    </userContextProvider>
  )
}

export default App
