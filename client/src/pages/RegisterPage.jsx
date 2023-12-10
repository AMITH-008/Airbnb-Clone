import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.post('/register', {
            name,
            email,
            password
        });
        console.log(res);
    }catch(error) {
        alert("Registration Failed");
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Sign Up</h1>
        <form className=' max-w-md mx-auto' onSubmit={handleSubmit}>
          <input 
            type='email' 
            placeholder='your@email.com' 
            id='email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} />
          <input 
            type='text' 
            placeholder='username' 
            id='username' 
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <input 
            type='password' 
            placeholder='Password' 
            id='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <button className='primary'> Register </button>
        </form>
        <div className='text-center font-semibold py-2 text-gray-400'>
          Already have an account?  
           <Link to={'/login'} className=' mx-1 underline text-black font-bold'>Log In</Link> 
        </div>
      </div>
      
    </div>
  )
}

export default RegisterPage