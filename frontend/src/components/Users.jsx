import React, { useEffect, useState } from 'react'
import User from './User'
import axios from 'axios';
const Users = () => {
   const [users,setUsers]=useState([]);
   const [filter,setFilter]=useState([]);

   useEffect(()=>{
    axios.get('http://localhost:5000/api/v1/user/bulk?filter='+filter)
    .then(response => {
      setUsers(response.data.user)
  })
   },[filter])
  return (
    <>
    <div className='font-bold text-lg mt-6'>Users</div>
    <div className='my-2'><input className='w-full px-2 py-1 border rounded border-slate-200' placeholder='Search user' onChange={(e)=>setFilter(e.target.value)}/></div>
      <div >
    {users.map((user)=><User user={user}/>)}
      </div>
    </>
  )
}

export default Users
