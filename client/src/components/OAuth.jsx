import {GoogleAuthProvider, signInWithPopup, getAuth, FacebookAuthProvider} from "firebase/auth"
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import {app} from '../firebase.js'

const OAuth = () => {


  const handleGoogleLogin = async () => {

    const provider = new GoogleAuthProvider();
    const fbAuthProvider = new FacebookAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    const {user} = result;
    console.log(user);

  }

  return (
    <button type="button" onClick={handleGoogleLogin} className=" flex justify-center items-center gap-2 border border-primary w-full mt-1 p-2 rounded-2xl bg-white text-primary hover:border-white hover:bg-primary hover:text-white">
        <FcGoogle />
        Continue With Google 
    </button>
  )
}

export default OAuth