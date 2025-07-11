import { useState ,useId} from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './customHooks/useCurrencyInfo'
import './App.css'
import './index.css'
function App() {
  
  const [amount,setAmount]=useState(0)
  const [from,setFrom]=useState('usd')
  const [to, setTo]=useState('inr')
  const [convertedAmount,setConvertedAmount]=useState(0 )
  const currencyInfo=useCurrencyInfo(from)
  return (
    <>
      <h1 className='text-3xl bg-orange-500'>currency app</h1>
    </>
  )
}

export default App
