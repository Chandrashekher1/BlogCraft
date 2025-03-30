import React from 'react'
import SocialIcons from './SocialIcon'

const Footer = () => {
  return (
    <div className='flex md:justify-between px-4 border border-t border-indigo-800 py-4'>
        <div><h1 className='font-bold text-2xl flex cursor-pointer'>CP <p className='text-blue-700'>03</p></h1></div>
        <div>
            <p className='md:font-semibold md:text-xl'>Created by Cp03 <span>, @2025</span></p>
        </div>
        <div>
            <ul className=''>
                <SocialIcons/>
            </ul>            
        </div>
    </div>
  )
}

export default Footer