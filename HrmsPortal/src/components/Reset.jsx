import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Reset = () => {

    const navigate = useNavigate();
    const newPwd=''
    const newCpwd=''

    const [password,setpassword]=useState('');
    const [confirmpassword,setconfirmpassword]=useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit=(e)=>{
        e.preventDefault();
        if (validatePassword()) {
            setSuccessMessage('Passwords match and contain special characters!');
            setErrorMessage('');
            alert('Passwords match and contain special characters!')
            navigate('/logout');
          } else {
            setSuccessMessage('');
            navigate('/')
          }

       
    }

    const validatePassword = () => {
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(password)) {
                setErrorMessage('Password must contain at least one special character.');
                return false;
              }
             

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            console.log(password.length)
            return false;
          }
        if (password !== confirmpassword) {
          setErrorMessage('Passwords do not match.');
          return false;
        }
        return true;
      };
    

    const handlePasswordChange=(e)=>{
        const newPwd=e.target.value;
        setpassword(newPwd);
    }

    const handleConfirmPasswordChange=(e)=>{
        const newCpwd=e.target.value;
        setconfirmpassword(newCpwd);

       
    }

  return (
    <div>
      <div className='reset-main bg-slate-400'>
        <h1 className='font-semibold tracking-wider '>Reset Password</h1>
        <div className='reset-inner-main  flex flex-col'>
            <form onSubmit={handleSubmit}>
                <div className='pwd'>
                    <label htmlFor='password'> New Password :</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div className='pwd mt-4'>
                    <label>Re-enter password : </label>
                    <input type="password" name="re-password" value={confirmpassword} onChange={handleConfirmPasswordChange}/>
                </div>
                <div>
                    <button className='font-semibold bg-green-600 text-white px-4 py-2 mt-5 rounded-md w-full '>Submit</button>
                </div>
            </form>
            <div className='mt-5'>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Reset
