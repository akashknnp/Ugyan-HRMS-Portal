import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const handleButtonClick = (event) => {
        event.preventDefault();  
        navigate('/Dashboard');
    }

    return (
        <div className='login'>  
            <div className='main1'>
                <h1>Login Page</h1>
                <form onSubmit={handleButtonClick}>
                    <div className='input1'>
                        <label className='label1'>Username:</label>
                        <input type='text' htmlFor='username' className='input-field' required/>
                    </div>
                    <div className='input2'>
                        <label className='label2'>Password:</label>
                        <input type='password' htmlFor='password' className='input-field' required/>
                    </div>
                    <button className='submit' type='submit'>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Login;
