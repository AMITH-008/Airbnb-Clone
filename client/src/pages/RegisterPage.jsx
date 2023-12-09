import React from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Sign Up</h1>
        <form className=' max-w-md mx-auto'>
          <input type='email' placeholder='your@email.com' id='email' />
          <input type='text' placeholder='username' id='username' />
          <input type='password' placeholder='Password' id='password' />
          <button className='primary'> Register </button>
        </form>
        <div className='text-center font-semibold py-2 text-gray-400'>
          Already have an account?  
           <Link to={'/register'} className=' mx-1 underline text-black font-bold'>Log In</Link> 
        </div>
      </div>
      
    </div>
  )
}

export default RegisterPage