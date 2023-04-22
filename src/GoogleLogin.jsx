import React from 'react'
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import auth from './firebase';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
    const nav=useNavigate()
    const googleLoginHandler = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                if(result.user){
                    sessionStorage.setItem("uid",result.user.uid)
                    nav('/profile')
                }
            }).catch((error) => {
                console.log(error)
            });
    }
  return (
    <div><button className='btn btn-outline-secondary mt-3' onClick={googleLoginHandler} >Login with Google</button></div>
  )
}

export default GoogleLogin