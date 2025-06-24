import { useNavigate } from 'react-router-dom';
import Postcard from '../components/PostCard';
import { Backgorund_image } from '../utils/constant';
import React from 'react';
const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center overflow-hidden'>
      <div  className="flex flex-col justify-center items-start w-[80%] rounded-md mt-4 min-h-[500px] sm:min-h-[600px] md:min-h-[600px] bg-no-repeat bg-cover bg-center text-white px-4 sm:px-6 lg:px-12" 
        style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${Backgorund_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}
      >
        <h1 className="md:text-4xl text-3xl font-extrabold mt-80 drop-shadow-lg mx-4">
          Share Your Thoughts with the World
        </h1>
        <p className="font-medium text-lg md:text-2xl  text-gray-200 mt-4 mx-4">
          Create a unique and beautiful blog easily.
        </p>

        <button className="mt-6 bg-blue-600 hover:bg-blue-500 font-semibold md:text-xl px-6 py-3 rounded-lg cursor-pointer mx-4 mb-4
            transition-all duration-300 shadow-md active:scale-95" onClick={() => navigate("/create-post")}>
          CREATE YOUR BLOG
        </button>
      </div>

      <div className="mx-24 mt-16">
        <h1 className='font-semibold text-3xl mx-20 md:mt-4 mt-16'>Featured Posts</h1>
        <Postcard/>
      </div>
    </div>
  );
};

export default Home;
