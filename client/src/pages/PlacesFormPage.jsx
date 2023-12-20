import React, {useEffect, useState} from 'react';
import Perks from '../Perks';
import PhotosUploader from '../components/PhotosUploader';
import AccountNavPage from './AccountNavPage';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { useContext } from 'react';
import { UserContext } from '../UserContext';

const PlacesFormPage = () => {

    const {id} = useParams();

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
    const [editable, setEditable] = useState(true);
    const [price, setPrice] = useState(0);

    const {user} = useContext(UserContext);
    
    
    useEffect(()=> {
      if(id !== undefined) {
        const fetchPlace = async () => {
          const {data} = await axios.get("/places/"+id);
          console.log(data);
          setTitle(data.title);
          setAddress(data.address);
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setDescription(data.description);
          setExtraInfoe(data.extraInformation);
          setMaxGuests(data.maxGuests);
          setPerks(data.perks);
          setAddedPhotos(data.pics);
          if(data.ownner !== user._id.toString()) {
            setEditable(false);
          }
        }
        fetchPlace();
        
      }
    }, [id]);

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

    const savePlace = async (e) => {
        e.preventDefault();

        if(id !== undefined) {
          const placeData = {
            title,
            address,
            description,
            extraInfo,
            checkIn,checkOut,
            maxGuests,
            perks,
            addedPhotos,
            price
          }
          const {data} = await axios.put("/places/"+id, placeData);
          console.log(data);
          setRedirect(true);
          return;
        }
        const placeData = {
          title,
          address,
          description,
          extraInfo,
          checkIn,checkOut,
          maxGuests,
          perks,
          addedPhotos,
          price
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
        <form onSubmit={savePlace}>
        {preInput("Title","Title For Your Place, should be catchy")}
        <input readOnly={true && !editable} 
            type='text' placeholder='title' value={title} onChange={ev => setTitle(ev.target.value)} />
        {preInput("Address", "Address to this place")}
        <input readOnly={true && !editable} 
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
            <input readOnly={true && !editable} 
                type="text" placeholder='24hr format' value={checkIn} onChange={e=> setCheckIn(e.target.value)} />
            </div>
            <div>
            <h3 className='mt-2 ml-2 -mb-1'>Check-Out</h3>
            <input readOnly={true && !editable} 
                type="text"  placeholder='24hr format' value={checkOut} onChange={e=> setCheckOut(e.target.value)}/>
            </div>
            <div>
            <h3 className='mt-2 ml-2 -mb-1'>Max Guests Allowed</h3>
            <input readOnly={true && !editable} 
                type="text" placeholder='4 Guests...' value={maxGuests} onChange={e=> setMaxGuests(e.target.value)}/>
                
            </div>
            <div>
            <h3 className='mt-2 ml-2 -mb-1'>Price Per Night<span>($)</span></h3>
            <input readOnly={true && !editable} 
                type="text" placeholder='4 Guests...' value={price} onChange={e=> setPrice(e.target.value)}/>
                
            </div>
        </div>
        <button disabled={true && !editable} className='primary mt-4 disabled:bg-slate-500'>Save</button>
        </form>
    </div>
    </>
  )
}

export default PlacesFormPage