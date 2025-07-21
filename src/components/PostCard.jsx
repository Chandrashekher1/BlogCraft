import React, { useEffect, useState } from 'react';
import { post_API } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { IoIosArrowRoundForward } from "react-icons/io";
import he from 'he';
import Skeleton from '@mui/material/Skeleton';

const Postcard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(post_API);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const json = await response.json();
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
    <div className="flex flex-wrap justify-center px-4 md:px-16 min-h-screen">
      {loading ? (
        Array.from({ length: shimmerCount }).map((_, index) => (
          <div
            key={index}
            className="border flex justify-between md:flex-row flex-col-reverse border-gray-800 bg-gray-950 bg-opacity-70 
              p-6 m-4 shadow-lg backdrop-blur-md w-80 md:w-full rounded-xl text-white"
          >
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width={80} height={20} animation="wave" />
              <Skeleton variant="text" width="60%" height={28} animation="wave" />
              <Skeleton variant="text" width="90%" height={20} animation="wave" />
              <Skeleton variant="text" width="50%" height={20} animation="wave" />
              <Skeleton variant="rectangular" width={100} height={36} animation="wave" style={{ borderRadius: '8px' }} />
            </div>
            <Skeleton
              variant="rectangular"
              width={320}
              height={240}
              animation="wave"
              className="rounded-md"
              style={{ borderRadius: '12px' }}
            />
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
              <p className="mt-2 text-gray-300">{parse(he.decode(post.content.slice(0, 100)))}...</p>
              <h2 className="text-sm text-gray-400 mt-1">By {post.author}</h2>
              <button
                className='border border-gray-700 px-2 py-2 rounded-md my-4 active:scale-105 cursor-pointer flex'
                onClick={() => handlePostClick(post._id)}
              >
                Read more <IoIosArrowRoundForward style={{ marginTop: '6px', marginLeft: '4px', color: 'white' }} />
              </button>
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
