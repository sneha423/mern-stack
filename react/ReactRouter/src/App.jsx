import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './components/home/Home'
import AboutUs from './components/aboutUs/AboutUs'
import Contact from './components/contactUs/Contact'
import Footer from './components/header/footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Home/>
      
      <Footer/>
    </>
  )
}

export default App
