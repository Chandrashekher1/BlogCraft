import React, { useEffect, useState } from 'react';
import { post_API } from '../utils/constant';
import { useNavigate } from 'react-router-dom';

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
        console.log(json);
        setData(json);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const shimmerCount = data.length > 0 ? data.length : 6;

  const handlePostClick = (postId) => {
    navigate(`/post-view/${postId}`);
  };

  return (
    <div className="flex flex-wrap justify-center my-12 px-4 md:px-16 bg-black min-h-screen py-10">
      {loading ? (
        Array.from({ length: shimmerCount }).map((_, index) => (
          <div 
            key={index} 
            className="w-full sm:w-80 m-4 p-6 bg-gray-800 rounded-xl shadow-lg h-80 animate-pulse"
          >
          </div>
        ))
      ) : data.length > 0 ? (
        data.map((post) => (
          <div 
            key={post._id} 
            onClick={() => handlePostClick(post._id)} 
            className="border border-gray-700 bg-gray-900 bg-opacity-70 h-[60%]
            p-6 m-4 shadow-lg backdrop-blur-md w-full sm:w-80 rounded-xl transition-all 
            hover:scale-105 hover:shadow-xl cursor-pointer text-white active:scale-100"
          >
            <img 
              src={post?.image?.length > 0 ? post.image[0] : "https://www.hexaphortechnologies.co.in/service_img/1687797021.png"}
              alt="Post Thumbnail" 
              className="w-full h-40 object-cover rounded-lg"
            />
            <h1 className="text-lg sm:text-xl font-bold mt-4">{post.title}</h1>
            <h2 className="text-sm text-gray-400 mt-1">By {post.author}</h2>
            <p className="mt-2 text-gray-300 ">{post.content.slice(0, 100)} <span className='text-lg text-cyan-700'>... Read more...</span></p>
          </div>
        ))
      ) : (
        <div className="text-2xl sm:text-3xl text-gray-400">No posts available.</div>
      )}
    </div>
  );
};

export default Postcard;
