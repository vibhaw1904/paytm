import React, { useState } from 'react'
import Button from '../components/Button'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Input from '../components/Input'
import Warning from '../components/Warning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate=useNavigate();
  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[password,setPassword]=useState('');
  const[username,setUsername]=useState('');


  // const handleSignup=async(e)=>{
  //   e.preventDefault();
  //   const res=await axios.post('http://localhost:5000/api/v1/user/signup',{firstName,lastName,username,password}) 
  //   console.log(res.data)
  //   localStorage.setItem("token", res.data.token)
  //   navigate("/dashboard")
  //   .catch((err)=>{
  //     console.log(err.message)
  //   })
  // }
  return (
   <div className='flex justify-center h-screen bg-slate-300 '>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 mt-2 h-max px-4 text-center shadow-2xl'>
          <Heading label={"Signup"}/>
          <SubHeading label={"Enter you information to create your account"}/>
          <Input placeholder="john" label={"Firstname"} onChange={(e)=>setFirstName(e.target.value)}/>
          <Input placeholder="doe" label={"Lastname"} onChange={(e)=>setLastName(e.target.value)}/>
          <Input placeholder="john@example.com" label={"Email"} onChange={(e)=>setUsername(e.target.value)}/>
          <Input  label={"Password"} onChange={(e)=>setPassword(e.target.value)}/>





      <div className='pt-4'>
        <Button onClick={async () => {
            const response = await axios.post("http://localhost:5000/api/v1/user/signup", {
              username,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }} label={"Signup"}></Button>
      </div>
      <Warning label={"Already have an Account?"} ButtonText={"SignIn"} to={"/"}/>
      </div>
      </div>

    </div> 
  ) 
  
}

export default Signup
