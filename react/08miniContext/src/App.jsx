import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import userContextProvider from './Context/UserContextProvider'
import Login from './componenets/Login'
import Profile from './componenets/Profile'
function App() {
  

  return (
    <userContextProvider>
      <h1>mini context api project</h1>
      <Login/>
      <Profile/>
    </userContextProvider>
  )
}

export default App
