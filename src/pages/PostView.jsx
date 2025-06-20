import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { post_API } from "../utils/constant"
import Shimmer from "../components/Shimmer";


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
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold flex-1">{postData.title}</h1>
        {/* <p className="text-lg flex-1 md:text-2xl">{postData.content}</p> */}
      </div>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-4">
        {Array.isArray(postData.image) && postData.image.length > 0 ? (
          postData.image.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Post Image ${index + 1}`}
              className="w-full object-cover rounded-lg shadow-md max-h-80"
            />
          ))
        ) : (
          <img
            src="https://marketinginsidergroup.com/wp-content/uploads/2023/09/shutterstock_234456937-scaled-1.jpg"
            alt="Default Post"
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        )}
    </div>
    <div className="flex-1">
      <p className="text-lg md:text-2xl mb-4">{postData.content}</p>
      <p className="text-xl font-semibold">
        Written By: <span className="text-cyan-600 font-bold">{postData.author || "Unknown"}</span>
      </p>
      <p className="text-lg font-medium text-gray-600">Date: {postData.date || "Not Available"}</p>
    </div>
      </div>
    </div>
  );
};

export default PostView;
