import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import forget from '../components/Forget'
import logo from "../assets/ugyan.png"

const Login = () => {
    const navigate = useNavigate();

    const handleButtonClick = (event) => {
        event.preventDefault();  
        navigate('/Dashboard');
    }

    return (
        <div className='background-div1'>
            {/* <div className='login-text text-center bg-slate-400'>
             <h1 className='absolute text-white text-5xl '>Welcome to UGYAN Eductech</h1></div> */}
        <div className='login'>  
            <div className='main1'>
                <h1>Login</h1>
                <form onSubmit={handleButtonClick}>
                    <div className='input1'>
                        <label className='label1'>Username:</label>
                        <input type='text' htmlFor='username' className='input-field' placeholder='Enter Your User-ID' required/>
                    </div>
                    <div className='input2'>
                        <label className='label2'>Password:</label>
                        <input type='password' htmlFor='password' className='input-field'placeholder='Password' required/>
                    </div>
                    <div className='forget-link'><Link to={'/forget'}>Forget Password</Link></div>
                    <button className='submit' type='submit'>Submit</button>
                    
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login;
