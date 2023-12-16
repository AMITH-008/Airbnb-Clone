import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";

import Perks from '../Perks';
import axios from 'axios'



const PlacesPage = () => {
  const {action} = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfoe] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut , setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [buttonStatus, setButtonStatus] = useState(false);
  const fileRef = useRef(null);

  const inputHeader = (text) => {
    return (<h2 className='text-2xl mt-4 ml-2 font-bold'>{text}</h2>)
  }

  const inputDescription = (description) => {
    return (<p className='text-gray-400 text-sm ml-2'>{description}</p>)
  }

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  const addPhotoByLink = async ( ) => {
    const {data:filename} = await axios.post('/uploadPhotoByLink', {
      link: photoLink
    });
    console.log(filename['newName']);
    setAddedPhotos(prev => {
      return [...prev, filename['newName']];
    });
    setPhotoLink("");
  }

  const uploadPhotoFromDevice = async (e) => {
    try{
      const files = e.target.files;
      const uploadData = new FormData();
      for(let i=0;i<files.length;i++) {
        uploadData.append('photos', files[i]);
      }
      const {data} = await axios.post("/uploadPhotos",uploadData, {
        headers: {
          'Content-Type':'multipart/form-data'
        }
      });
      setAddedPhotos(prev => [...prev, ...data]);
    }catch(err) {
      console.log(err);
      alert("Upload Failed, Try Again");
    }
    
  }

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
            {preInput("Title","Title For Your Place, should be catchy")}
            <input 
              type='text' placeholder='title' value={title} onChange={ev => setTitle(ev.target.value)} />
            {preInput("Address", "Address to this place")}
            <input 
              type="text" placeholder='address' value={address} onChange={e => setAddress(e.target.value)} />
            {preInput("Photos", "Pictures speak more than words")}
            <div className='flex gap-2'>
              <input 
                type="text" placeholder='Add Using a link.....' value={photoLink} onChange={e => {
                  console.log(e.target.value.length);
                  if(e.target.value.length > 0) {
                    setButtonStatus(true);
                  }else {
                    setButtonStatus(false);
                  }
                  setPhotoLink(e.target.value);
                }}/>
              <button type='button' className='bg-gray-300 grow px-4 rounded-2xl' disabled={!buttonStatus} onClick={addPhotoByLink}>Add&nbsp;Photo</button>
            </div>
            
            <div className='grid grid-cols-3 gap-2 items-center lg:grid-cols-6 md:grid-cols-4 mt-2'>
              {addedPhotos.length > 0 && addedPhotos.map(pic => (
                <div>
                  <img className='rounded-2xl ' src={"http://localhost:3000/uploads/"+pic} alt="Image" />
                </div>
              ))}
              <label className='flex gap-2 justify-center items-center border bg-transparent rounded-full p-4  mt-2 cursor-pointer'>
                <FaCloudUploadAlt  className='font-extrabold text-xl w-5 h-5' />
                <input type='file' className='hidden'  onChange={uploadPhotoFromDevice} />
                Upload
              </label>
            </div>
            {preInput("Description", "Describe About the place ... like Elgeant etc.")}
            <textarea value={description} onChange={e=> setDescription(e.target.value)}  />
            {preInput("Perks","Select all the perks available at your place")}
            <div className='grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra Info", "House Rules, Ambience")}
            <textarea value={extraInfo}  onChange={e=> setExtraInfoe(e.target.value)}/>
            {preInput("Check In & Out time, max guests", "Add Check In And Check Out Time, remember to have some time between consecutive guests for cleaning of room.")}
            
            <div className='grid gap-2 sm:grid-cols-3'>
              <div>
                <h3 className='mt-2 ml-2 -mb-1'>Check-In</h3>
                <input 
                  type="text" placeholder='24hr format' value={checkIn} onChange={e=> setCheckIn(e.target.value)} />
              </div>
              <div>
                <h3 className='mt-2 ml-2 -mb-1'>Check-Out</h3>
                <input 
                  type="text"  placeholder='24hr format' value={checkOut} onChange={e=> setCheckOut(e.target.value)}/>
              </div>
              <div>
                <h3 className='mt-2 ml-2 -mb-1'>Max Guests Allowed</h3>
                <input 
                  type="text" placeholder='4 Guests...' value={maxGuests} onChange={e=> setMaxGuests(e.target.value)}/>
                  
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