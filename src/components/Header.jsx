import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='flex justify-between p-4  shadow-md sticky top-0 bg-black'>
      <div>
        <h1 className='font-bold text-2xl cursor-pointer flex'>CP <p className='text-blue-700'>03</p></h1>
      </div>
      <div>
        <Navbar/>
      </div>
    </div>
  )
}

export default Header