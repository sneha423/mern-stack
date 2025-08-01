import React, { useContext, useState } from 'react'
import userContext from '../Context/UserContext'
function Login() {
    const[username,setusername]=useState('') 
    const[password,setPassword]=useState('')
    const{setUser}=useContext(userContext)
    const handleSubmit=(e)=>{
        e.preventDefault()
        setUser({username,password})

    }
  return (
    <div>
        <h2>Login</h2>
        <div >
        <input type="text" value={username}
        onChange={(e)=>{setusername(e.target.value)}} placeholder='username' />
        {"   "}
        <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' />
        {'   '}
        <button onClick={handleSubmit}>submit</button>
        </div>
    </div>
  )
}

export default Login