import React,{useState} from 'react'
import {auth} from './firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';
function Auth() {
    const [data,setData]=useState({
        email:"",
        password:""
    })
    const {email,password}=data;
    const changeHandler=e=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const signin=e=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
          .then((user) => console.log(user))
          .catch((err) => console.log(err));
    }
    const signUp=e=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
          .then((user) => console.log(user))
          .catch((err) => console.log(err));
    }

  return (
    
    <div className='Authclass'>
        <center>
      <form>
        <label>
        Email:<input type="email" name="email" value={email} placeheolder="email" onChange={changeHandler} required></input>
        </label>
        <br></br>
        <label>
        Password:
        <input type="password" name="password" value={password} placeheolder="password" onChange={changeHandler} required></input>
        </label>     
        <br></br>
        <button onClick={signin}>sign in</button>
        <button onClick={signUp}>sign up</button>
      </form>
      </center>
    </div>
  );
}

export default Auth;
