import React from 'react'
import { IoBookOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";

const Featured = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-center mx-12 md:mx-40 my-8'>
        <div className='border border-gray-800 bg-gray-900 rounded-md text-center flex flex-col items-center p-4 my-4 md:mx-4 hover:-translate-y-1.5'>
            <span className='border rounded-full p-2 border-transparent bg-gray-600 hover:bg-gray-500 hover:duration-300'><IoBookOutline style={{fontSize:'30px'}}/></span>
            <h1 className='font-bold text-xl my-2'>Easy Publishing</h1>
            <p className='text-gray-400'>Create and publish your stories with our intuitive editor and AI assistance</p>
        </div>
        <div className='border border-gray-800 bg-gray-900 rounded-md text-center flex flex-col items-center p-4 my-4 md:mx-4 hover:-translate-y-1.5'>
            <span className='border rounded-full p-2 border-transparent bg-gray-600 hover:bg-gray-500'><FiUsers style={{fontSize:'30px'}}/></span>
            <h1 className='font-bold text-xl my-2'>Growing Community</h1>
            <p className='text-gray-400'>Connect with readers and writers from around the world</p>
        </div>
        <div className='border border-gray-800 bg-gray-900 rounded-md text-center flex flex-col items-center p-4 my-4 md:mx-4 hover:-translate-y-1.5'>
            <span className='border rounded-full p-2 border-transparent bg-gray-600 hover:bg-gray-500'><FaArrowTrendUp style={{fontSize:'30px'}}/></span>
            <h1 className='font-bold text-xl my-2'>AI-Powered</h1>
            <p className='text-gray-400'>Generate content ideas and overcome writer's block with AI</p>
        </div>
    </div>
  )
}

export default Featured