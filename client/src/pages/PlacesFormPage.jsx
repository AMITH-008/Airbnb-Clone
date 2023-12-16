import React, {useState} from 'react';
import Perks from '../Perks';
import PhotosUploader from '../components/PhotosUploader';
import AccountNavPage from './AccountNavPage';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PlacesFormPage = () => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfoe] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut , setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [redirect,setRedirect] = useState(false);

    const preInput = (header, description) => {
        return (
          <>
            {inputHeader(header)}
            {inputDescription(description)}
          </>
        )
    }

    const inputHeader = (text) => {
        return (<h2 className='text-2xl mt-4 ml-2 font-bold'>{text}</h2>)
      }
    
    const inputDescription = (description) => {
    return (<p className='text-gray-400 text-sm ml-2'>{description}</p>)
    }

    const addNewPlace = async (e) => {
        e.preventDefault();
        const placeData = {
          title,
          address,
          description,
          extraInfo,
          checkIn,checkOut,
          maxGuests,
          perks,
          addedPhotos
        }
      const {data} = await axios.post("/places", placeData);
      console.log(data);
      setRedirect(true);
    }


   if(redirect) {
     return <Navigate to={'/account/places'} />
   } 

  return (
    <>
    <div>
        <AccountNavPage />
        <form onSubmit={addNewPlace}>
        {preInput("Title","Title For Your Place, should be catchy")}
        <input 
            type='text' placeholder='title' value={title} onChange={ev => setTitle(ev.target.value)} />
        {preInput("Address", "Address to this place")}
        <input 
            type="text" placeholder='address' value={address} onChange={e => setAddress(e.target.value)} />
        {preInput("Photos", "Pictures speak more than words")}
        <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos}  />
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
    </>
  )
}

export default PlacesFormPage