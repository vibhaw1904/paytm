import React from 'react'

const Appbar = () => {
  return (
    <div className='shadow h-14 flex justify-between'>
      <div className='flex flex-col justify-center h-full ml-4 font-bold text-2xl'>
        Paytm Wallet
      </div>
      <div className='flex '>
        <div className='flex flex-col justify-center mr-4 h-full'>Hello</div>
        <div className='rounded-full w-12 h-12 bg-slate-200 mt-1 mr-2 flex justify-center'>
            <div className='flex flex-col justify-center h-full text-xl'>
                U
            </div>
        </div>
      </div>
    </div>
  )
}

export default Appbar
