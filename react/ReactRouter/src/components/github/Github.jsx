import React, { useEffect, useState } from 'react'

function Github() {
    const [data,setdata]=useState([]) 
    useEffect(()=>{
        fetch('https://api.github.com/users/hiteshchoudhary').then(res=>res.json()).then(data=>{setdata(data)})

    },[])
  return (
    <div className='text-center m-4 bg-gray-500 text-white p-4 text-3xl'>Github followers:{data.followers}</div>
  )
}

export default Github