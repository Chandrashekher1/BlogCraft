import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul className='flex text-md font-semibold'>
          <Link to="/"><li className='mx-8 cursor-pointer hover:border px-2 py-1'>Home</li></Link>
          <Link to="/login"><li className='mx-4 cursor-pointer hover:border px-2 py-1'>Sign In</li></Link>
          <Link to="/create-post"><li className='mx-2 cursor-pointer hover:border px-2 py-1'>CREATE YOUR BLOG</li></Link>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar