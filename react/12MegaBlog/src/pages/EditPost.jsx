import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/config'
import { Container,PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {
    const [post,setPosts]=useState([])
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            databaseService.getPost(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug,navigate])
  return (
    post?(
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ):null
  )
}

export default EditPost