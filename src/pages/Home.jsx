import { useNavigate } from 'react-router-dom';
import Postcard from '../components/PostCard';
import { Backgorund_image } from '../utils/constant';
import React from 'react';
import { BsStars } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";
import Featured from '../components/Featured';
import Achievement from '../components/Achievement';
import { FaRobot } from "react-icons/fa6";

const Home = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem('userId')
  return (
    <div className='flex flex-col items-center justify-center overflow-hidden min-h-screen bg-gray-950'>
      <div className='mt-16 my-4 mx-8 text-center'>
        <p className='flex font-semibold rounded-full px-4 py-1 bg-gray-800'><BsStars className='mt-1 md:mx-2 text-xl'/> Now with AI-Powered writing assistance</p>
      </div>
      
      <div className='mx-8 my-4 md:w-[50vw]'>
        <h1 className='text-center font-bold text-4xl md:text-6xl'>Share Your <span className='bg-gradient-to-r from-white to-gray-600 bg-clip-text text-transparent'>Amazing Stories</span></h1>
        <p className='text-center text-gray-400 my-4 text-lg'>Join our vibrant community of writers and readers. Create, share, and discover compelling stories that inspire, educate, and entertain. Now powered by AI to help you write better.</p>
      </div>

      <div>
        <button className='flex border bg-white text-black font-semibold px-8 py-2 rounded-md text-lg cursor-pointer' onClick={() => navigate('/create-post')}>Start Writing Today <IoIosArrowRoundForward style={{marginTop:'6px',marginLeft:'20px', fontSize:'20px'}}/></button>
        <p className='text-center text-gray-400 my-2'>No credit card required</p>
      </div>

      <div className='border-b border-b-gray-900'>
        <Featured/>
      </div>
      <div className='border-b border-b-gray-900'>
        <Achievement/>
      </div>
      
      {user ? (<div className='flex flex-col justify-center items-center my-8 border border-zinc-700 mx-4 md:w-[50vw] md:h-[50vh] bg-gray-900 p-4 shadow rounded-md'>
        <span className='border bg-zinc-900 p-4 rounded-full border-transparent'>{<FaRobot style={{color:'white'}}/>}</span>
        <h1 className='font-bold text-lg text-white my-2 md:text-3xl'>Try Our AI Blog Generator</h1>
        <p className='text-gray-400 text-center md:px-16 md:my-4'>Writer's block? Let AI help you create compelling blog content in seconds. Just provide a topic, and our AI will craft a complete blog post for you. </p>
        <button className='flex bg-white px-6 py-2 rounded-md text-black font-semibold my-4 cursor-pointer' onClick={() => navigate('/blog-generator')}><BsStars style={{marginTop:'4px',marginRight:'4px'}}/> Generate with AI</button>
      </div>) : null}

      <div className="md:mx-24 mt-16">
        <h1 className='font-semibold text-3xl mx-20 md:mt-4 mt-16 text-center'>Latest Stories</h1>
        <p className='text-center text-gray-400 mx-16 my-2 text-lg'>Discover inspiring content from our community</p>
        <Postcard/>
      </div>
    </div>
  );
};

export default Home;
