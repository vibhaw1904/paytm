import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Input from '../components/Input'
import Button from '../components/Button'
import Warning from '../components/Warning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SignIn = () => {
  const navigate=useNavigate();
  const[username,setUsername]=useState('');
  const [password,setPassword]=useState('');

  const handleSignin=async(e)=>{
    e.preventDefault();
    // localStorage.setItem('token');

   const res= await axios.post('http://localhost:5000/api/v1/user/signin',{username,password},{
      headers: {
        'Content-Type': 'application/json',
      },
    })
      const token= await res.data.token;
      localStorage.setItem('userData',JSON.stringify(res.data))
      localStorage.setItem('token', token);
      console.log(res.data)
navigate('/dashboard')

    
   
  }
  

  return (
    <div className='flex justify-center h-screen bg-slate-300 '>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 mt-2 h-max px-4 text-center shadow-2xl'>
      <Heading label={"SignIn"}/>
      <SubHeading label={"Enter you credentials to access your account"}/>
      <Input label={"Email"} placeholder={"John@example.com"} to={"/signup"} onChange={(e)=>setUsername(e.target.value)}/>
      <Input label={"Password"}  onChange={(e)=>setPassword(e.target.value)}/>
      <div className='pt-4'>
        <Button label={"Sign In"} onClick={handleSignin}></Button>
      </div>
      <Warning label={"Don't have an Account?"} ButtonText={"Signup"} to={"/signup"}/>
    </div>
    </div>
    </div>
  )
}

export default SignIn
