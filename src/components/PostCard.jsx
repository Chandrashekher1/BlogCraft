import React, { useEffect, useState } from 'react';
import { post_API } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { IoIosArrowRoundForward } from "react-icons/io";
import he from 'he'


const Postcard = () => {  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(post_API);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const json = await response.json()
        setData(json);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const shimmerCount = data.length > 0 ? data.length : 4;
  const handlePostClick = (postId) => {
    navigate(`/post-view/${postId}`);
  };

  return (
    <div className="flex flex-wrap justify-center px-4 md:px-16  min-h-screenh-40 ">
      {loading ? (
        Array.from({ length: shimmerCount }).map((_, index) => (
          <div 
            key={index} 
            className="md:w-full  w-80 h-60 m-4 p-6 bg-gray-800 rounded-xl shadow-lg animate-pulse flex justify-between flex-col-reverse md:flex-row"
          >
          <div>
            <div className='bg-gray-400 h-2 w-40 my-2 rounded-lg'></div>
            <div className='bg-gray-400 h-4 w-60 rounded-lg'></div>
            <div className='bg-gray-400 h-4 md:w-80 w-40 rounded-lg my-2'></div>
            <div className='bg-gray-400 h-4 w-60 rounded-lg'></div>
            <button className='rounded-md py-2 px-8 bg-gray-500'></button>
          </div>
          <div className='md:h-40 md:w-80 w-60 h-60 bg-gray-500 rounded-md'></div>
          </div>
        ))
      ) : data.length > 0 ? (
        data.map((post) => (
          <div 
            key={post._id} 
            className="border flex justify-between md:flex-row flex-col-reverse border-gray-800 bg-gray-950 bg-opacity-70 
            p-6 m-4 shadow-lg backdrop-blur-md w-80 md:w-full rounded-xl transition-all 
            hover:-translate-y-2 cursor-pointer hover:shadow-xl text-white"
          >
            <div onClick={() => handlePostClick(post._id)}>
              <p className='text-gray-400'>Featured</p>
              <h1 className="text-lg sm:text-xl font-bold mt-4">{post.title}</h1>
              <p className="mt-2 text-gray-300 ">{parse(he.decode(post.content.slice(0, 100)))}...</p>
              <h2 className="text-sm text-gray-400 mt-1">By {post.author}</h2>
              <button className='border border-gray-700 px-2 py-2 rounded-md my-4 active:scale-105 cursor-pointer flex' >Read more {<IoIosArrowRoundForward style={{marginTop:'6px',marginLeft:'4px', color:'white'}}/>}</button>
            </div>
            <img 
              src={post?.image?.length > 0 ? post.image[0] : "https://www.hexaphortechnologies.co.in/service_img/1687797021.png"}
              alt="Post Thumbnail" 
              className="w-120 h-60 object-cover rounded-lg"
            />
          </div>
        ))
      ) : (
        <div className="text-2xl sm:text-3xl text-gray-400">No posts available.</div>
      )}
    </div>
  );
};

export default Postcard;
