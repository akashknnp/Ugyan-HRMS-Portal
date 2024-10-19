import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const handleButtonClick = (event) => {
        event.preventDefault();  
        navigate('/Dashboard');
    }

    return (
        <>  
            <div className='container'>
                <div className='main flex bg-blend-color-burn bg-zinc-600 w-1/4 h-400 justify-center align-center'>
                    <div className='i-main py-4'>
                        <h1 className='text-2xl text-center font-bold px-4 py-2 rounded-md'>LOGIN</h1>
                        <form>
                            <br/>
                            <label htmlFor="username">Username:</label><br/>
                            <input type="text" id="username" name="username" required className='rounded-xl mt-2 px-4 py-2 border-none'/><br/>
                            <label htmlFor="password">Password:</label><br/>
                            <input type="password" id="password" name="password" className='rounded-xl mt-2 px-4 py-2 border-none' required/><br/>
                            <button type="submit" className='m-5 bg-green-800 px-4 py-2 rounded-md font-bold ml-16 text-white' onClick={handleButtonClick}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
           
       
        </>
    )
}

export default Login;
