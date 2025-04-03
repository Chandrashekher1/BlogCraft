import { useNavigate } from 'react-router-dom';
import Postcard from '../components/PostCard';
import React from 'react';
const Home = () => {
  const navigate = useNavigate()
  const postId = "12345"
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center py-12">
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

      <div className="">
        <Postcard  postId={postId}/>
      </div>
    </>
  );
};

export default Home;
