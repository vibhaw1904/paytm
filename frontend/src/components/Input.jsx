import React from 'react'

const Input = ({label,placeholder,onChange}) => {
  return (
    <div>
        <div className='text-sm font-medium py-2 text-left'>
        {label}
        </div>
        <input onChange={onChange} placeholder={placeholder} className='w-full px-2 py-1 border rounded border-slate-200 '/>
    </div>
  )
}

export default Input
