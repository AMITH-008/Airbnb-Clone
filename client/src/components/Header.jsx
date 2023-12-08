import React from 'react'
import { FaAirbnb, FaUserCircle } from "react-icons/fa"
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <header className='p-4 flex justify-between'>
        <a href="" className='flex gap-2 items-center'>
            <FaAirbnb className='w-8 h-6'/>
            <span className='font-bold text-xl'>Air</span>
        </a>
        <div className='flex gap-2 border  border-gray-400 rounded-full py-2 px-4 shadow-md shadow-gray-400'>
            <div>Anywhere</div>
            <div className='border-l border-gray-700'></div>
            <div>Any Week</div>
            <div className='border-l border-gray-700'></div>
            <div>Add Guests</div>
            <button className='bg-primary text-white rounded-full p-1'>
                <CiSearch className='h-4 w-4' />
            </button>
        </div>
        <div className='flex gap-2 items-center border border-gray-400 rounded-full py-2 px-4'>
          <GiHamburgerMenu className='text-sm' />
          <FaUserCircle className='text-2xl'/>
        </div>
    </header>
  )
}

export default Header