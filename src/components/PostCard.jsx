import React, { useEffect, useState } from 'react';

const Postcard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://cp-blog.onrender.com/api/post");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center my-12 px-4 md:px-16 bg-black min-h-screen py-10">
      {data.length > 0 ? (
        data.map((post, index) => (
          <div key={index} className="border border-gray-700 bg-gray-900 bg-opacity-70 
          p-6 m-4 shadow-lg backdrop-blur-md w-full sm:w-80 rounded-xl transition-all 
          hover:scale-105 hover:shadow-xl cursor-pointer text-white">
            <img 
              src="https://www.hexaphortechnologies.co.in/service_img/1687797021.png" 
              alt="Post Thumbnail" 
              className="w-full h-40 object-cover rounded-lg"
            />
            <h1 className="text-lg sm:text-xl font-bold mt-4">{post.title}</h1>
            <h2 className="text-sm text-gray-400 mt-1">By {post.author}</h2>
            <p className="mt-2 text-gray-300">{post.content.slice(0, 100)}...</p>
          </div>
        ))
      ) : (
        <p className="text-2xl sm:text-3xl text-gray-400">Loading posts...</p>
      )}
    </div>
  );
};

export default Postcard;
