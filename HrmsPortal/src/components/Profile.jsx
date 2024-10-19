import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate();

    const gotodash = (event) => {
        event.preventDefault();  
        navigate('/Dashboard');
    }
  return (
    <>
    <div className='flex justify-between m-5'>
      <h1>profile</h1>
      <button onClick={gotodash}><IoMdCloseCircle className='text-4xl text-right'/></button>
    </div>
    </>
  )
}

export default Profile
