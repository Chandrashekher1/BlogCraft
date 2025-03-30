import React from 'react'
import Postcard from '../components/Postcard'

const Home = () => {
  return (
    <>
      <div className='text-center my-16 text-2xl'>
        <h1 className='md:text-4xl text-3xl font-bold my-2'>Lorem ipsum dolor sit amet.</h1>
        <p className='font-semibold text-md text-gray-400'>Create a unique and beautiful blog easily.</p>

        <button className='my-4 border border-cyan-500 p-4 cursor-pointer shadow-md shadow-cyan-600 active:scale-95'>CREATE YOUR BLOG</button>
      </div>
      <div>
        <Postcard/>
      </div>
    </>
    
    
  )
}

export default Home