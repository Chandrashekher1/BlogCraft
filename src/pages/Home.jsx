import { useNavigate } from 'react-router-dom';
import Postcard from '../components/PostCard';
import React from 'react';
import {motion} from 'framer-motion'

const Home = () => {
  const navigate = useNavigate()



  return (
    <>
      <div className="flex flex-col items-center justify-center text-center py-12 bg-gradient-to-r from-blue-200 to-purple-500">
        <h1 className="md:text-5xl text-3xl font-extrabold my-4 drop-shadow-lg">
        
          Share Your Thoughts with the World
        </h1>
        <p className="font-medium text-lg md:text-2xl  text-gray-200">
          Create a unique and beautiful blog easily.
        </p>

        <button className="mt-6 border text-cyan-600 font-bold text-xl px-6 py-3 rounded-lg cursor-pointer shadow-blue-700
           hover:text-white transition-all duration-300 shadow-md active:scale-95" onClick={() => navigate("/create-post")}>
          CREATE YOUR BLOG
        </button>
      </div>
      <motion.div className='md:px-40 my-16 mx-4'  whileHover={{
        scale: 1.05,
        rotateX: 10,
        rotateY: -10,
        transition: { type: 'spring', stiffness: 300, damping: 15 }
      }}>
        <img 
          src="https://res.cloudinary.com/dt9a9xhz1/image/upload/v1750410254/Blog_cqjl4v.png" 
          alt="Home"
          className='shadow-2xl shadow-blue-400 bg-gradient-to-r from-blue-500 to-purple-500  '
          />
      </motion.div>

      <div className="">
        <Postcard/>
      </div>
    </>
  );
};

export default Home;
