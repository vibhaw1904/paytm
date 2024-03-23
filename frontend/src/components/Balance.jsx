import React from 'react'
import NotificationButton from '../pages/Notification';
const Balance = ({value}) => {
  return (
    <div className='flex  justify-between'>
      <div className='flex'>
      <div className='font-bold text-lg'>Your Balance</div>
      <div className='font-semibold ml-4 text-lg'>rs {value.toFixed(2)}</div>
      </div>
      <NotificationButton/>
    </div>
  )
}

export default Balance;
