import React, { useEffect, useState } from 'react'
import { useLoaderData } from "react-router-dom";
function Github() {
    const foll=useLoaderData()
    // const [data,setdata]=useState([]) 
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/hiteshchoudhary').then(res=>res.json()).then(data=>{setdata(data)})

    // },[])
  return (
    <div className='text-center m-4 bg-gray-500 text-white p-4 text-3xl'>Github followers:{foll.followers}</div>
  )
}

export default Github
export const useGithubInfo=async()=>{
    const res=await fetch('https://api.github.com/users/hiteshchoudhary')
    return res.json()
}