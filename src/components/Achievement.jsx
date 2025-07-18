import React from 'react'
import { FiUsers } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";


const Achievement = () => {
  return (
    <div className='my-8 flex flex-col md:justify-between md:flex-row'>
        <div className='flex flex-col items-center my-6 md:mx-8'>
            <span className='text-center bg-gray-800 p-3 rounded-md'><FiUsers className='md:text-3xl text-xl'/></span>
            <p className='font-bold text-lg mt-2 md:text-2xl'>10,000+ </p>
            <span className='text-gray-400'>Active Writers</span>
        </div>
        <div className='flex flex-col items-center my-6 md:mx-8'>
            <span className='text-center bg-gray-800 p-3 rounded-md'><IoBookOutline className='md:text-3xl text-xl'/></span>
            <p className='font-bold text-lg mt-2 md:text-2xl'>50,000+ </p>
            <span className='text-gray-400'>Published Posts</span>
        </div>
        <div className='flex flex-col items-center my-6 md:mx-8'>
            <span className='text-center bg-gray-800 p-3 rounded-md'><FaArrowTrendUp className='md:text-3xl text-xl'/></span>
            <p className='font-bold text-lg mt-2 md:text-2xl'>1M+ </p>
            <span className='text-gray-400'>Monthly Readers</span>
        </div>
    </div>
  )
}

export default Achievement