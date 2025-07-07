import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
function MyApp(){
  return(
    <div>
      <h1>custom function</h1>
    </div>
  )
}
//object can't be used as such
const ReactElemnet = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "click me to visit google",
};

const anotherElement=(
  <a href="https://google.com" target='_blank'>visit google</a>
)
createRoot(document.getElementById('root')).render(
  anotherElement
)
