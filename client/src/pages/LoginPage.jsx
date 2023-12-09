import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className=' max-w-md mx-auto'>
          <input type='email' placeholder='your@email.com' id='email' />
          <input type='password' placeholder='Password' id='password' />
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