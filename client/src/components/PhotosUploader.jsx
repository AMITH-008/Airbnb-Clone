import React, {  useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';

const PhotosUploader = () => {

    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [buttonStatus, setButtonStatus] = useState(false);

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

  return (
    <>
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
                <div className='h-32 flex' key={pic}>
                  <img className='rounded-2xl w-full object-cover' src={"http://localhost:3000/uploads/"+pic} alt="Image" />
                </div>
              ))}
              <label className='flex h-32 gap-2 justify-center items-center border bg-transparent rounded-full p-4  mt-2 cursor-pointer'>
                <FaCloudUploadAlt  className='font-extrabold text-xl w-5 h-5' />
                <input type='file' multiple className='hidden'  onChange={uploadPhotoFromDevice} />
                Upload
              </label>
            </div>
    </>
  )
}

export default PhotosUploader