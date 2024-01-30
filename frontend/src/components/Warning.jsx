import React from 'react'
import { Link } from 'react-router-dom'
const Warning = ({label,ButtonText,to}) => {
  return (
    <div className='py-2 text-sm flex justify-center'>
    <div>{label}</div>
    <Link className='pointer underline pl-1 cursor-point text-blue-700' to={to}>
    {ButtonText}
    </Link>
    </div>
  )
}

export default Warning
