import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(email);
      console.log(password);
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      setUser(response.data);
      alert('Login Successfull');

      setRedirect(true);
    }catch(error) {
      alert('Login failed');
    }
  }
  if(redirect) {
    return <Navigate to="/" />
  }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className=' max-w-md mx-auto' onSubmit={handleSubmit}>
          <input 
            type='email' 
            placeholder='your@email.com' 
            id='email'
            value={email}
            onChange={ e => setEmail(e.target.value)} />
          <input 
            type='password' 
            placeholder='Password' 
            id='password'
            value = {password}
            onChange={e => setPassword(e.target.value)} />
          <button className='primary'> Login </button>
        </form>
        <div className='text-center font-semibold py-2 text-gray-400'>
          Don't have an account yet?  
           <Link to={'/register'} className=' mx-1 underline text-black font-bold'>Register Now</Link> 
        </div>
      </div>
      
    </div>
  )
}

export default LoginPage