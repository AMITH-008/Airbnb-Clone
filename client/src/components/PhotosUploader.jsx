import React, {  useState } from 'react'
import { FaCloudUploadAlt, FaRegTrashAlt, FaStar , FaRegStar} from "react-icons/fa";
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';

const PhotosUploader = ({addedPhotos, setAddedPhotos}) => {

    
    const [photoLink, setPhotoLink] = useState('');
    const [buttonStatus, setButtonStatus] = useState(false);

    const addPhotoByLink = async ( ) => {

        
        

        fetch(photoLink).then(response => {
          response.blob().then(blob => {
            console.log(blob);
            uploadToFirebase(blob);
            setPhotoLink("");
          })
        })
        
        // const {data:filename} = await axios.post('/uploadPhotoByLink', {
        //   link: photoLink
        // });
        // console.log(filename['newName']);
        // setAddedPhotos(prev => {
        //   return [...prev, filename['newName']];
        // });
        
      }

      const uploadToFirebase = (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "fbairbnb.jpg";
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on("state_changed", (snapshot) => {
              console.log("onProgress-> ", snapshot.state);
            }, (error)=> {
              console.log(error.message);
            }, async () => {
              console.log("Upload Successfully");
              const dlURL = await getDownloadURL(storageRef);
              console.log(dlURL);
              setAddedPhotos(prev => [...prev, dlURL]);
            })

      }
    
      const uploadPhotoFromDevice = async (e) => {
        try{
          const files = e.target.files;
          const uploadData = new FormData();
          for(let i=0;i<files.length;i++) {
            uploadToFirebase(files[i]);
            uploadData.append('photos', files[i]);
          }
          // const {data} = await axios.post("/uploadPhotos",uploadData, {
          //   headers: {
          //     'Content-Type':'multipart/form-data'
          //   }
          // });
          // setAddedPhotos(prev => [...prev, ...data]);
        }catch(err) {
          console.log(err);
          alert("Upload Failed, Try Again");
        }
        
      }

    const removePhoto = (event, pic) => {
      event.preventDefault();
      setAddedPhotos([...addedPhotos].filter(item => item !== pic));
    }

    const setDisplayPhoto = (event, pic) => {
      event.preventDefault();
      const rest = addedPhotos.filter(photo => photo !== pic);
      setAddedPhotos([pic, ...rest]);
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
                <div className='h-32 flex relative' key={pic}>
                  <img className='rounded-2xl w-full object-cover' src={pic} alt="Image" />
                  <button onClick={(ev) => removePhoto(ev, pic)} className='absolute right-2 top-2 cursor-pointer p-1 bg-slate-800 bg-opacity-6'>
                    <FaRegTrashAlt className='text-white' />
                  </button>
                  <button onClick={(ev) => setDisplayPhoto(ev, pic)} className='absolute left-2 top-2 cursor-pointer p-1 bg-opacity-10'>
                    {pic === addedPhotos[0]?  <FaStar className='text-white text-xl' />: <FaRegStar className='text-white text-xl' /> }
                    
                  </button>
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