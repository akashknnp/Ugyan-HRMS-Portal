import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Fetch = () => {


    const [error,seterror]=useState('')
    const[post,setpost]=useState({})
    const[loading,setloading]=useState(true)

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then(response=>{
            setloading(false)
            setpost(response.data)
            seterror('')
        })

        .catch(error=>{
            setloading(false)
            seterror("something went wrong")
            setpost({})
        })
    },[])
  return (
    <div>
      {loading?'loading':post.title}
      {error? error:null}
    </div>
  )
}

export default Fetch
