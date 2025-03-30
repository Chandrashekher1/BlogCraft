import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const handleLogo = () => {
      navigate("/")
  }

  return (
    <div className='flex justify-between p-4  shadow-md sticky top-0 bg-black'>
      <div>
        <h1 className='font-bold text-2xl cursor-pointer flex' onClick={handleLogo} >CP <p className='text-blue-700'>03</p></h1>
      </div>
      <div>
        <Navbar/>
      </div>
    </div>
  )
}

export default Header