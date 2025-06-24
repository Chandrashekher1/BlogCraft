import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { post_API, sample_image } from "../utils/constant"
import Shimmer from "../components/Shimmer";
import { AiFillHeart } from "react-icons/ai"
import { AiOutlineComment } from "react-icons/ai"
import parse from 'html-react-parser';

const PostView = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const token = localStorage.getItem("authorization");
  const navigate = useNavigate()

  const handlenavigate = () => {
    navigate('/login')
  }
  useEffect(() => {
    if (!id || !token) {
      handlenavigate()
      return
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(`${post_API}/${id}`, {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const postJson = await response.json();
        setPostData(postJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPost();
  }, [id,token])

  if (!postData) {
    return (
      <div className="h-screen" >
        <Shimmer/>
      </div>
    )
  }
  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      <div className="flex flex-col  justify-between items-start gap-6 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold flex-1">{postData.title}</h1>
        <p className="text-xl font-semibold -mt-4">
          By: <span className="text-cyan-600 font-semibold">{postData.author || "Unknown"}</span>
        </p>
        <p className="text-lg font-medium text-gray-600 -mt-4">Date: {postData.date || "Not Available"}</p>
      </div>
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap">
        {Array.isArray(postData.image) && postData.image.length > 0 ? (
          postData.image.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Post Image ${index + 1}`}
              className="w-96 object-cover rounded-lg shadow-md max-h-80 mx-4 my-2"
            />
          ))
        ) : (
          <img
            src={sample_image}
            alt="Default Post"
            className="w-96 h-80 object-cover rounded-lg shadow-md"
          />
        )}
    </div>
    <div className="flex">
      <p className="text-lg md:text-2xl mb-4 text-wrap mx-4">{parse(postData.content)}</p>
    </div>
     <div className="flex gap-4 items-center mt-2">
      <AiFillHeart className="text-red-500 text-4xl cursor-pointer" />
      <AiOutlineComment className="text-gray-600 text-4xl cursor-pointer" />
    </div>
    </div>
    </div>
  );
};

export default PostView;
