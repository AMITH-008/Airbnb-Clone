import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { GiFoodChain, GiShower } from "react-icons/gi";
import { FaCar } from "react-icons/fa6";
import { MdOutlineFastfood } from "react-icons/md";
import { FaDisplay } from "react-icons/fa6";
import { MdPool } from "react-icons/md";



const PlacesPage = () => {
  const {action} = useParams();
  console.log(action);
  return (
    <div>
    {
      action !== 'new' && (
        <div className='text-center'>
          <Link className='bg-primary text-white py-2 px-6 rounded-full inline-flex items-center gap-1' to={'/account/places/new'}>
              <IoMdAdd className='font-extrabold text-xl' />
              Add new places
          </Link>
        </div>
      )
    }
    {
      action === 'new' && (
        <div>
          <form>
            <h2 className='text-2xl mt-4 ml-2 font-bold'>Title</h2>
            <p className='text-gray-400 text-sm ml-2'>Title For Your Place, should be catchy</p>
            <input type='text' placeholder='title' />
            <h2 className='text-2xl mt-4 ml-2 font-bold'>Address</h2>
            <p className='text-gray-400 text-sm ml-2'>Address to this place</p>
            <input type="text" placeholder='address' />
            <h2 className='text-2xl mt-4 ml-2 font-bold'>Photos</h2>
            <p className='text-gray-400 text-sm ml-2'>Pictures speak more than words</p>
            <div className='flex gap-2'>
              <input type="text" placeholder='Add Using a link.....' />
              <button className='bg-gray-300 grow px-4 rounded-2xl'>Add&nbsp;Photo</button>
            </div>
            <div className='grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 mt-2'>
              <button className='flex gap-2 justify-center items-center border bg-transparent rounded-full py-2 px-4 mt-2'>
                <FaCloudUploadAlt  className='font-extrabold text-xl w-5 h-5' />
                Upload
              </button>
            </div>
            <h2 className='text-2xl mt-4 ml-2 font-bold'>Description</h2>
            <p className='text-gray-400 text-sm ml-2'>Describe About the place ... like Elgeant etc.</p>
            <textarea  />
            <h2 className='text-2xl mt-4 ml-2 font-bold'>Perks</h2>
            <p className='text-gray-400 text-sm ml-2'>Select all the perks available at your place</p>
            <div className='grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type='checkbox' />
                <FaWifi />
                <span>Free Wifi</span>
              </label> 
              <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type='checkbox' />
                <GiShower />
                <span>Hot Water</span>
              </label>
              <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type='checkbox' />
                <FaCar />
                <span>Free Parking Spot</span>
              </label>
              <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type='checkbox' />
                <MdOutlineFastfood />
                <span>Dining</span>
              </label>
              <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type='checkbox' />
                <FaDisplay />
                <span>TV</span>
              </label>
              <label className="p-4 border flex gap-2 items-center rounded-2xl cursor-pointer">
                <input type='checkbox' />
                <MdPool />
                <span>Pool</span>
              </label>
            </div>
            
            <h2 className='text-2xl mt-4 ml-2 font-bold'>Extra Info</h2>
            <p className='text-gray-400 text-sm ml-2'>House Rules, Ambience</p>
            <textarea />
            <h2 className='text-2xl mt-4 ml-2 font-bold'>Check In & Out time, max guests</h2>
            <p className='text-gray-400 text-sm ml-2'>Add Check In And Check Out Time, remember to have some time between consecutive guests for cleaning of room.</p>
            <div className='grid gap-2 sm:grid-cols-3'>
              <div>
                <h3 className='mt-2 ml-2 -mb-1'>Check-In</h3>
                <input type="text" placeholder='24hr format'/>
              </div>
              <div>
                <h3 className='mt-2 ml-2 -mb-1'>Check-Out</h3>
                <input type="text"  placeholder='24hr format'/>
              </div>
              <div>
                <h3 className='mt-2 ml-2 -mb-1'>Max Guests Allowed</h3>
                <input type="text" placeholder='4 Guests...'/>
              </div>
            </div>
            <button className='primary mt-4 '>Save</button>
          </form>
        </div>
      )
    }
    </div>
  )
}

export default PlacesPage