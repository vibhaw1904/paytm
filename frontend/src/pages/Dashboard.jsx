import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios'

const Dashboard = () => {
    const[balance,setbalance]=useState(0);
    const token=localStorage.getItem('token')
useEffect(()=>{
  axios.get('http://localhost:5000/api/v1/account/balance',{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  .then((res)=>{
    setbalance(res.data.balance)
  })
},[balance])
  return (
    <div>
      <Appbar/>
      <div className='m-8'>
        <Balance value={balance}/>
        <Users/>
      </div>
    </div>
  )
}

export default Dashboard
