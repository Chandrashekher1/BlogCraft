import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul className='flex text-md font-semibold'>
          <li className='mx-8 cursor-pointer '>Home</li>
          <li className='mx-4 cursor-pointer'>Sign In</li>
          <li className='mx-2 cursor-pointer'>CREATE YOUR BLOG</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar