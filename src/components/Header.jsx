import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='flex justify-between p-4  shadow-md'>
      <div>
        <h1>LOGO</h1>
      </div>
      <div>
        <Navbar/>
      </div>
    </div>
  )
}

export default Header