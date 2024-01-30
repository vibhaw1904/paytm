import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
const User = ({user}) => {

    const navigate=useNavigate();

  return (
    <div className='flex justify-between mt-4'>
      <div className='flex'>
        <div className='rounded-full w-12 h-12 flex justify-center mt-1 mr-2 bg-slate-200'>
            <div className='flex flex-col justify-center h-full text-xl'>
            {user.firstName[0]}
            </div>
        </div>
        <div className='flex flex-col h-full justify-center '>
            <div>
                {user.firstName} {user.lastName}
            </div>
        </div>
      </div>
      <div className='flex flex-col h-full justify-center'><Button label={"Send money"} onclick={()=>navigate('/send')}/></div>
    </div>
  )
}

export default User
